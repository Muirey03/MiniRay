import { ColourVector } from './colourVector.js';

export class SceneObject {
	constructor (pos, colour = new ColourVector(0, 0, 0)) {
		this.pos = pos;
		this.colour = colour;
	}

	rayIntersection (ray) {
		return null;
	}
}
