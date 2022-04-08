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

export class RayTracing {
	constructor (buffer, width, height) {
		this.buffer = buffer;
		this.width = width;
		this.height = height;

		this.NUM_RAY_BOUNCES = 5;
		this.SKY_COLOR = new ColorVector(50, 153, 204);

		// create our scene
		this.createScene();

		// render:
		this.renderScene();
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
		this.camera.iterateDirectionVectors(this.width, this.height, async (x, y, dir) => {
			const hits = this.raytrace(this.camera.pos, dir, this.NUM_RAY_BOUNCES);
			let overallColor = this.SKY_COLOR;
			hits.reverse().forEach((hit) => {
				const hitColor = this.unlitColorForHit(hit, this.camera.pos);
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

	createScene () {
		this.scene = new Scene();
		const sphere1 = new SphereObject(new Vector(3, 0, -0.5), 0.5, new ColorVector(255, 255, 255), 100, 0.3);
		const sphere2 = new SphereObject(new Vector(3, 0.5, 1), 0.5, new ColorVector(0, 255, 0), 200, 0.1);
		const sphere3 = new SphereObject(new Vector(3, 1, -0.5), 0.5, new ColorVector(0, 0, 255), 100, 0.1);
		const plane1 = new PlaneObject(new Vector(0, -1, 0), new Vector(0, 1, 0), Infinity, new ColorVector(255, 255, 255), true, -1, 0);
		const light1 = new PointLight(new Vector(2, 2.5, 0), 0.75);
		const light2 = new PointLight(new Vector(1, 0.5, 0), 0.75);
		this.scene.addObject(sphere1);
		this.scene.addObject(sphere2);
		this.scene.addObject(sphere3);
		this.scene.addObject(plane1);
		this.scene.addLight(light1);
		this.scene.addLight(light2);

		const FOV = (60 / 360) * 2 * Math.PI;
		this.camera = new Camera(new Vector(-4, 0.2, 0), Matrix.xRotation(Math.PI / 2), FOV);
	}
}
