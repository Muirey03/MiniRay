// rayTracing.js is the entrypoint to the raytracing code. It will be separate from canvasRenderer.js as that will allow it to be used with ascii renderers etc.

import { Scene } from './scene.js';
import { SphereObject } from './sphereObject.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';
import { Matrix } from './matrix.js';

export class RayTracing {
	constructor (buffer, width, height) {
		this.buffer = buffer;
		this.width = width;
		this.height = height;

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

	renderScene () {
		const cameraPos = this.camera.pos;
		this.camera.iterateDirectionVectors(this.width, this.height, (x, y, dir) => {
			const hit = this.raycast(cameraPos, dir);

			// DEBUG code for colouring the spheres. This is wrong, we should be treating the camera as a light source and using distance etc etc:
			if (hit) {
				this.buffer[y * this.width + x] = 0xffffffff;
				const distanceToSphereCenter = hit.object.pos.sub(cameraPos).magnitude;
				const brightness = Math.min((hit.hits[0].distance - (distanceToSphereCenter - hit.object.radius)) / (hit.object.radius), 1);
				const a = 0xff - Math.ceil(0xff * brightness);
				this.buffer[y * this.width + x] = 0xff000000 + (a << 16) + (a << 8) + a;
			} else { this.buffer[y * this.width + x] = 0xff000000; }
		});
	}

	createScene () {
		this.scene = new Scene();
		const sphere1 = new SphereObject(new Vector(2, 0, 0), 0.5);
		const sphere2 = new SphereObject(new Vector(3, 1, 1), 0.5);
		this.scene.addObject(sphere1);
		this.scene.addObject(sphere2);
		const FOV = (60 / 360) * 2 * Math.PI;
		// TODO: init camera with x and y rotations that it can use to form its rotation matrix
		this.camera = new Camera(Vector.zero, Matrix.xRotation(0), FOV);
	}
}
