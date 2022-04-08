import { SceneObject } from './sceneObject.js';
import { intersectVectorWithSphere } from './rayMath.js';

export class SphereObject extends SceneObject {
	constructor (pos, radius, color, specular, reflectivity) {
		super(pos, specular, reflectivity);
		this.radius = radius;
		this.color = color;
	}

	rayIntersection (ray) {
		const hits = intersectVectorWithSphere(ray.origin, ray.direction, this.pos, this.radius);
		return hits.length > 0 ? { object: this, hits: hits } : null;
	}

	surfaceNormal (point) {
		return point.sub(this.pos).normalized();
	}

	colorAtPoint (point) {
		return this.color;
	}
}
