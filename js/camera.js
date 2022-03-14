import { Vector } from './vector.js';

export class Camera {
	constructor (pos, dir /* TODO: replace with xRot, yRot */, FOV) {
		this.pos = pos;
		this.direction = dir;
		this.FOV = FOV;

		// TODO: this.rotationMatrix = ...
	}

	iterateDirectionVectors (width, height, fn) {
		const xViewArea = Math.tan(this.FOV);
		const yViewArea = xViewArea * (height / width);
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const xShift = (x / width - 0.5) * xViewArea;
				const yShift = (y / height - 0.5) * yViewArea;

				// TODO: don't just add, mul by rot matrix instead
				// What we are currently doing creates weird stretches on the edges
				const dir = new Vector(0, xShift, yShift).add(this.direction);
				fn(x, y, dir);
			}
		}
	}
}
