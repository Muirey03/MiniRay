import { ColorVector } from './colorVector.js';

export class SceneObject {
	constructor (pos, color = new ColorVector(0, 0, 0)) {
		this.pos = pos;
		this.color = color;
	}

	rayIntersection (ray) {
		return null;
	}
}
