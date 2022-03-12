// rayTracing.js will be the entrypoint to the raytracing code. It will be separate from canvasRenderer.js as that will allow it to be used with ascii renderers etc.

import { Scene } from './scene.js';
import { SphereObject } from './sphereObject.js';
import { Vector } from './vector.js';
import { Camera } from './camera.js';

function raycast(pos, dir, scene) {
	for (const obj of scene.objects) {
		const hit = obj.rayIntersection({origin: pos, direction: dir});
		if (hit) return hit;
	}
	return null;
}

export class RayTracing {
	constructor(buffer, width, height) {
		this.buffer = buffer;
		this.width = width;
		this.height = height;

		// create our scene
		this.createScene();

		// DEBUG: does our camera ray intersect the sphere:
		const s = Array.from(this.scene.objects)[0];
		const ray = {origin: this.camera.pos, direction: this.camera.direction};

		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const cameraPos = new Vector(0, x - width / 2, y - height / 2);
				
				const hit = raycast(cameraPos, new Vector(1,0,0), this.scene);
				if (hit) {
					//const dist = (hit.hits[0].magnitude - 70) / 65;
					const distanceToSphereCenter = hit.object.pos.sub(cameraPos).magnitude;
					const brightness = Math.min((hit.hits[0].magnitude - (distanceToSphereCenter - hit.object.radius)) / (hit.object.radius),1);
					const a = 0xff - Math.ceil(0xff * brightness);
					this.buffer[y*width+x] = 0xff000000 + (a << 16) + (a << 8) + a;
				} else
					this.buffer[y*width+x] = 0xff000000;
			}
		}
	}

	createScene() {
		this.scene = new Scene();
		const sphere1 = new SphereObject(new Vector(100, -7, 0), 20);
		const sphere2 = new SphereObject(new Vector(200, 10, 0), 15);
		this.scene.addObject(sphere1);
		this.scene.addObject(sphere2);
		this.camera = new Camera(Vector.zero, new Vector(1, 0, 0));
	}
}
