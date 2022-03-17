import { Vector } from './vector.js';

export class Camera {
	constructor (pos, rotMatrix, FOV) {
		this.pos = pos;
		this.rotMatrix = rotMatrix;
		this.FOV = FOV;
		this.projDist = 1;
	}

	iterateDirectionVectors (width, height, fn) {
		// DEBUG CODE: let prevDir = Vector.zero;
		const viewWidth = 2 * Math.tan(this.FOV / 2) * this.projDist;
		const verticalFOV = 2 * Math.atan(Math.tan(this.FOV / 2) * height / width);
		const viewHeight = 2 * Math.tan(verticalFOV / 2) * this.projDist;
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				const dir = this.rotMatrix.vectMul(new Vector(1, (x / width - 0.5) * viewWidth, (y / height - 0.5) * viewHeight));
				/* DEBUG CODE:
				if (x === 0 || y === 0) {
					const newDir = dir.mul(1 / dir.x);
					console.log(newDir.distance(prevDir));
					prevDir = newDir;
				}
				*/
				fn(x, y, dir);
			}
		}
		console.log(height);
	}
}
