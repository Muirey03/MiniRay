// rayTracing.js is the entrypoint to the raytracing code. It will be separate from canvasRenderer.js as that will allow it to be used with ascii renderers etc.

import { Scene } from './scene.js';
import { SphereObject } from './sphereObject.js';
import { PlaneObject } from './planeObject.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Matrix } from './matrix.js';
import { DirectionalLight, PointLight } from './light.js';
import { ColorVector } from './colorVector.js';
import { reflectVectorInPlane } from './rayMath.js';
import { Material } from './material.js';

export class RayTracing {
	constructor (buffer, width, height) {
		this.buffer = buffer;
		this.width = width;
		this.height = height;

		this.NUM_RAY_BOUNCES = 5;
		this.SKY_COLOR = new ColorVector(50, 153, 204);

		// constructor cannot be async so we need a new function:
		(async () => {
			// create our scene
			await this.createScene();

			// render:
			this.renderScene();
		})();
	}

	raycast (origin, direction) {
		let closest = null;
		for (const obj of this.scene.objects) {
			const hit = obj.rayIntersection({ origin: origin, direction: direction });
			if (hit && (closest === null || hit.hits[0].distance < closest.hits[0].distance)) {
				closest = hit;
			}
		}
		return closest;
	}

	raytrace (origin, direction, maxBounces, hits = []) {
		const hit = this.raycast(origin, direction);
		if (hit && maxBounces >= 0) {
			hits.push(hit);
			const hitPoint = hit.hits[0].point;
			const reflectedVector = reflectVectorInPlane(direction, hit.object.surfaceNormal(hitPoint));
			return this.raytrace(hitPoint, reflectedVector, maxBounces - 1, hits);
		} else {
			return hits;
		}
	}

	computeLight (point, surfaceNorm, vectToCamera, specular) {
		let totalIllum = 0;
		// Check how much light every scene light contributes to the point
		for (const light of this.scene.lights) {
			const vectToLight = (light instanceof PointLight) ? light.pos.sub(point) : light.dir;

			// Check not in shadow by doing a raycast in this direction and ensuring nothing is hit:
			const hit = this.raycast(point, vectToLight);
			if (hit && ((light instanceof DirectionalLight) || hit.hits[0].distance < vectToLight.magnitude)) {
				continue;
			}

			// Taken from https://gabrielgambetta.com/computer-graphics-from-scratch/03-light.html

			// Diffuse reflection
			const mattScale = surfaceNorm.dot(vectToLight) / (vectToLight.magnitude);
			if (mattScale > 0) {
				totalIllum += light.intensity * mattScale;
			}

			// Specular reflection
			if (specular !== -1) {
				const reflectedLightVect = (surfaceNorm.mul(2 * surfaceNorm.dot(vectToLight))).sub(vectToLight);
				const reflectedDotCamera = vectToCamera.dot(reflectedLightVect);
				if (reflectedDotCamera > 0) {
					const specScale = (reflectedDotCamera / (vectToCamera.magnitude * reflectedLightVect.magnitude)) ** specular;
					totalIllum += light.intensity * specScale;
				}
			}
		}
		return totalIllum;
	}

	renderScene () {
		this.camera.iterateDirectionVectors(this.width, this.height, (x, y, dir) => {
			const hits = this.raytrace(this.camera.pos, dir, this.NUM_RAY_BOUNCES);
			let overallColor = this.SKY_COLOR;
			hits.reverse().forEach((hit) => {
				const hitColor = this.unlitColorForHit(hit);
				const illumination = this.illuminationForHit(hit);

				overallColor = hitColor.mul(illumination).lerp(overallColor, hit.object.reflectivity);
			});
			this.buffer[y * this.width + x] = overallColor.getReverseHexColor();
		});
	}

	illuminationForHit (hit) {
		const point = hit.hits[0].point;
		const hitToCamera = this.camera.pos.sub(point);
		const surfaceNorm = hit.object.surfaceNormal(point);
		return this.computeLight(point, surfaceNorm, hitToCamera, hit.object.specular);
	}

	unlitColorForHit (hit) {
		if (hit) {
			// Index 0 always has the lowest distance
			const point = hit.hits[0].point;
			return hit.object.colorAtPoint(point);
		} else {
			return this.SKY_COLOR;
		}
	}

	async createScene () {
		const earthMat = await Material.newMaterial('resources/earth.jpg', 1, 10, 0);
		const poolBallMat = await Material.newMaterial('resources/poolball.jpg', 1, 10, 0.05);
		const bricksMat = await Material.newMaterial('resources/bricks.jpg', 1, -1, 0);
		const checkerboardMat = await Material.newMaterial('resources/checkerboard.png', 1, -1, 0.1);

		this.scene = new Scene();
		const sphere1 = new SphereObject(new Vector(3, -0.5, -0), 0.5, bricksMat);
		const sphere2 = new SphereObject(new Vector(3, 1, 0.5), 0.5, poolBallMat);
		const sphere3 = new SphereObject(new Vector(3, -1, 1.5), 0.5, earthMat);
		const sphere4 = new SphereObject(new Vector(4, 0.2, 1.5), 0.5, Material.newColorMaterial(ColorVector.white, 100, 0.25));
		const plane1 = new PlaneObject(new Vector(0, 0, -1), new Vector(0, 0, 1), Infinity, checkerboardMat);
		const light1 = new PointLight(new Vector(2, 0, 2.5), 0.75);
		const light2 = new PointLight(new Vector(1, 0, 2), 1);
		this.scene.addObject(sphere1);
		this.scene.addObject(sphere2);
		this.scene.addObject(sphere3);
		this.scene.addObject(sphere4);
		this.scene.addObject(plane1);
		this.scene.addLight(light1);
		this.scene.addLight(light2);

		const FOV = (60 / 360) * 2 * Math.PI;
		this.camera = new Camera(new Vector(-2, 0, 1.5), Matrix.yawPitchRoll(0, 0.15, 0), FOV);
	}
}
