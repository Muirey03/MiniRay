import { Vector } from './vector.js';
import { ColorVector } from './colorVector.js';
import { pointAroundCircle } from './circleMath.js';

export class Camera {
	constructor (pos, rotMatrix, FOV, aperture) {
		this.pos = pos;
		this.rotMatrix = rotMatrix;
		this.FOV = FOV;
		this.projDist = 1;
		// Greater aperture = greater blur, smaller depth of field
		this.aperture = aperture;
		this.focusDist = 6;
		this.hRadius = new Vector(0, 0, this.aperture / 2);
		this.vRadius = new Vector(0, this.aperture / 2, 0);
		this.forward = this.rotMatrix.vectMul(new Vector(1, 0, 0));
		// Toggle antialiasing
		this.antiAliasing = true;
		this.SAMPLECOUNT = 20;
	}

	iterateDirectionVectors (width, height, fn, color) {
		const viewWidth = 2 * Math.tan(this.FOV / 2) * this.projDist;
		const viewHeight = viewWidth * height / width;
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				let overallColor = new ColorVector(0, 0, 0);
				// 'Dumb' method, samples colours around x, y and averages them
				if (this.antiAliasing) {
					for (let sampleNum = 0; sampleNum < this.SAMPLECOUNT; sampleNum++) {
						const pointOnCircle = pointAroundCircle(sampleNum / this.SAMPLECOUNT);
						const xOffsetted = x + pointOnCircle.x / 2;
						const yOffsetted = y + pointOnCircle.y / 2;
						const dir = this.rotMatrix.vectMul(new Vector(1, (xOffsetted / width - 0.5) * viewWidth, (yOffsetted / height - 0.5) * viewHeight));
						overallColor = overallColor.add(fn(dir, sampleNum).mul(1 / this.SAMPLECOUNT));
					}
				} else {
					const dir = this.rotMatrix.vectMul(new Vector(1, (x / width - 0.5) * viewWidth, (y / height - 0.5) * viewHeight));
					overallColor = fn(dir, 0);
				}
				// higher points in the scene = lower values of y in the pixelBuffer:
				color(x, height - 1 - y, overallColor);
			}
		}
	}
}
