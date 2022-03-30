import { SceneObject } from './sceneObject.js';
import { intersectVectorWithSphere } from './rayMath.js';

export class SphereObject extends SceneObject {
	constructor (pos, radius, color) {
		super(pos, color);
		this.radius = radius;
	}

	rayIntersection (ray) {
		const hits = intersectVectorWithSphere(ray.origin, ray.direction, this.pos, this.radius);
		return hits.length > 0 ? { object: this, hits: hits } : null;
	}
}
