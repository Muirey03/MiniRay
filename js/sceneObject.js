import { ColorVector } from './colorVector.js';

export class SceneObject {
	constructor (pos, color = new ColorVector(0, 0, 0), specular = -1) {
		this.pos = pos;
		this.color = color;
		this.specular = specular;
	}

	rayIntersection (ray) {
		return null;
	}
}
