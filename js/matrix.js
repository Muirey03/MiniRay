import { Vector } from './vector.js';

export class Matrix {
	constructor (col1 = Vector.zero, col2 = Vector.zero, col3 = Vector.zero) {
		this.col1 = col1;
		this.col2 = col2;
		this.col3 = col3;
	}

	add (other) {
		return new Matrix(this.col1.add(other.col1), this.col2.add(other.col2), this.col3.add(other.col3));
	}

	sub (other) {
		return new Matrix(this.col1.sub(other.col1), this.col2.sub(other.col2), this.col3.sub(other.col3));
	}

	vectMul (vect) {
		return this.col1.mul(vect.x).add(this.col2.mul(vect.y)).add(this.col3.mul(vect.z));
	}

	scaleMul (scalar) {
		return new Vector(this.col1.mul(scalar), this.col2.mul(scalar), this.col3.mul(scalar));
	}

	static xRotation (theta) {
		return new Matrix(new Vector(1, 0, 0), new Vector(0, Math.cos(theta), Math.sin(theta)), new Vector(0, -Math.sin(theta), Math.cos(theta)));
	}

	static yRotation (theta) {
		return new Matrix(new Vector(Math.cos(theta), 0, -Math.sin(theta)), new Vector(0, 1, 0), new Vector(Math.sin(theta), 0, Math.cos(theta)));
	}

	static zRotation (theta) {
		return new Matrix(new Vector(Math.cos(theta), Math.sin(theta), 0), new Vector(-Math.sin(theta), Math.cos(theta), 0), new Vector(0, 0, 1));
	}

	static yawPitchRoll (y, p, r) {
		// General rotation matrix taken from: https://en.wikipedia.org/wiki/Rotation_matrix
		return new Matrix(new Vector(Math.cos(y) * Math.cos(p), Math.sin(y) * Math.cos(p), -Math.sin(p)),
			new Vector(Math.cos(y) * Math.sin(p) * Math.sin(r) - Math.sin(y) * Math.cos(r), Math.sin(y) * Math.sin(p) * Math.sin(r) + Math.cos(y) * Math.cos(r), Math.cos(p) * Math.sin(r)),
			new Vector(Math.cos(y) * Math.sin(p) * Math.cos(r) + Math.sin(y) * Math.sin(r), Math.sin(y) * Math.sin(p) * Math.cos(r) - Math.cos(y) * Math.sin(r), Math.cos(p) * Math.cos(r)));
	}

	static get identity () {
		return new Matrix(new Vector(1, 0, 0), new Vector(0, 1, 0), new Vector(0, 0, 1));
	}
}
