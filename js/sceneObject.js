export class SceneObject {
	constructor (pos, specular = -1, reflectivity = 0) {
		this.pos = pos;
		this.specular = specular;
		this.reflectivity = reflectivity;
	}

	rayIntersection (ray) {
		throw new Error('rayIntersection not implemented.');
	}

	surfaceNormal (point) {
		throw new Error('surfaceNormal not implemented.');
	}

	colorAtPoint (point) {
		throw new Error('colorAtPoint not implemented.');
	}
}
