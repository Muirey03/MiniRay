export class SceneObject {
	constructor (pos, specular = -1) {
		this.pos = pos;
		this.specular = specular;
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
