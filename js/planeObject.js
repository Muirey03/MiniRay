import { SceneObject } from './sceneObject.js';
import { intersectVectorWithPlane } from './rayMath.js';
import { ColorVector } from './colorVector.js';

export class PlaneObject extends SceneObject {
	// radius = -1 means infinite plane
	constructor (pos, normal, radius, color, checkered, specular, reflectivity) {
		super(pos, specular, reflectivity);
		this.normal = normal.normalized();
		this.radius = radius;
		this.color = color;
		this.checkered = checkered;
	}

	rayIntersection (ray) {
		const hits = intersectVectorWithPlane(ray.origin, ray.direction, this.pos, this.normal, this.radius);
		return hits.length > 0 ? { object: this, hits: hits } : null;
	}

	surfaceNormal (point) {
		return this.normal;
	}

	colorAtPoint (point) {
		if (this.checkered) {
			const checkerSz = 1;
			const col = (Math.floor(point.x / checkerSz) + Math.floor(point.z / checkerSz)) % 2;
			if (col === 0) return ColorVector.black;
		}
		return this.color;
	}
}
