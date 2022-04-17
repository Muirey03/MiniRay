import { SceneObject } from './sceneObject.js';
import { intersectVectorWithSphere } from './rayMath.js';
import { sphericalMap } from './textureMapping.js';

export class SphereObject extends SceneObject {
	constructor (pos, radius, material) {
		super(pos, material);
		this.radius = radius;
	}

	rayIntersection (ray) {
		const hits = intersectVectorWithSphere(ray.origin, ray.direction, this.pos, this.radius);
		return hits.length > 0 ? { object: this, hits: hits } : null;
	}

	surfaceNormal (point) {
		return point.sub(this.pos).normalized();
	}

	colorAtPoint (point) {
		const UV = sphericalMap(point.sub(this.pos));
		return this.material.colorAtUV(UV);
	}
}
