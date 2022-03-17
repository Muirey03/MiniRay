import { Matrix } from './matrix.js';
import { Vector } from './vector.js';

export class Camera {
	constructor (pos, rotMatrix, FOV) {
		this.pos = pos;
		this.rotMatrix = rotMatrix;
		this.FOV = FOV;

		// TODO: this.rotationMatrix = ...
	}

	iterateDirectionVectors (width, height, fn) {
		const zViewArea = this.FOV;
		const yViewArea = zViewArea * (width / height);

		// let currentDir = this.rotMatrix.vectMul(Matrix.yRotation(-0.5 * yViewArea).vectMul(Matrix.zRotation(-0.5 * zViewArea).vectMul(new Vector(1, 0, 0))));
		// const yRot = Matrix.yRotation(yViewArea / width);
		// const zRot = Matrix.zRotation(zViewArea / height);

		for (let x = 0; x < width; x++) {
			// currentDir = yRot.vectMul(currentDir);
			for (let y = 0; y < height; y++) {
				// currentDir = zRot.vectMul(currentDir);
				// fn(x, y, currentDir);

				const yRot = -yViewArea * (x / width - 0.5);
				const zRot = -zViewArea * (y / height - 0.5);

				// FIXME: Slow.
				const dir = this.rotMatrix.vectMul(Matrix.yRotation(yRot).vectMul(Matrix.zRotation(zRot).vectMul(new Vector(1, 0, 0))));
				fn(x, y, dir);
			}
		}
	}
}
