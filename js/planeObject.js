import { SceneObject } from './sceneObject.js';
import { intersectVectorWithPlane } from './rayMath.js';
import { planarMap } from './textureMapping.js';

export class PlaneObject extends SceneObject {
	// radius = -1 means infinite plane
	constructor (pos, normal, radius, material) {
		super(pos, material);
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

	colorAtPoint (point) {
		const UV = planarMap(point);
		return this.material.colorAtUV(UV);
	}
}
