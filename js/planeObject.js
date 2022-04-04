import { SceneObject } from './sceneObject.js';
import { intersectVectorWithPlane } from './rayMath.js';

export class PlaneObject extends SceneObject {
	constructor (pos, normal, radius, color, specular) {
		super(pos, color, specular);
		this.normal = normal.normalized();
		this.radius = radius;
	}

	rayIntersection (ray) {
		const hits = intersectVectorWithPlane(ray.origin, ray.direction, this.pos, this.normal, this.radius);
		return hits.length > 0 ? { object: this, hits: hits } : null;
	}

	surfaceNormal (point) {
		return this.normal;
	}
}
