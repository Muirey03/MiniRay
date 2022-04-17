export class SceneObject {
	constructor (pos, material) {
		this.pos = pos;
		this.material = material;
	}

	get specular () {
		return this.material.specular;
	}

	get reflectivity () {
		return this.material.reflectivity;
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
