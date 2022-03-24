import { Vector } from './vector.js';

export class Camera {
	constructor (pos, rotMatrix, FOV) {
		this.pos = pos;
		this.rotMatrix = rotMatrix;
		this.FOV = FOV;
		this.projDist = 1;
	}

	iterateDirectionVectors (width, height, fn) {
		const viewWidth = 2 * Math.tan(this.FOV / 2) * this.projDist;
		const viewHeight = viewWidth * height / width;
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const dir = this.rotMatrix.vectMul(new Vector(1, (x / width - 0.5) * viewWidth, (y / height - 0.5) * viewHeight));
				fn(x, y, dir);
			}
		}
	}
}
