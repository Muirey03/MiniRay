import { Vector } from './vector.js';
import { ColorVector } from './colorVector.js';

export class Camera {
	constructor (pos, rotMatrix, FOV) {
		this.pos = pos;
		this.rotMatrix = rotMatrix;
		this.FOV = FOV;
		// Toggle antialiasing
		this.antiAliasing = false;
		this.SAMPLECOUNT = 10;
		this.projDist = 1;
	}

	iterateDirectionVectors (width, height, fn, color) {
		const viewWidth = 2 * Math.tan(this.FOV / 2) * this.projDist;
		const viewHeight = viewWidth * height / width;
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				let overallColor = new ColorVector(0, 0, 0);
				// 'Dumb' method, samples colours around x, y and averages them
				if (this.antiAliasing) {
					for (let s = 0; s < this.SAMPLECOUNT; s++) {
						const xOffsetted = x + Math.random() - 0.5;
						const yOffsetted = y + Math.random() - 0.5;
						const dir = this.rotMatrix.vectMul(new Vector(1, (xOffsetted / width - 0.5) * viewWidth, (yOffsetted / height - 0.5) * viewHeight));
						overallColor = overallColor.add(fn(dir));
					}
				} else {
					this.SAMPLECOUNT = 1;
					const dir = this.rotMatrix.vectMul(new Vector(1, (x / width - 0.5) * viewWidth, (y / height - 0.5) * viewHeight));
					overallColor = overallColor.add(fn(dir));
				}
				// higher points in the scene = lower values of y in the pixelBuffer:
				color(x, height - 1 - y, overallColor);
			}
		}
	}
}
