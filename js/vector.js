export class Vector {
	constructor (x, y, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	// static get zero () {
	// 	return new Vector(0, 0, 0);
	// }

	add (other) {
		return new Vector(this.x + other.x, this.y + other.y, this.z + other.z);
	}

	sub (other) {
		return new Vector(this.x - other.x, this.y - other.y, this.z - other.z);
	}

	dot (other) {
		return this.x * other.x + this.y * other.y + this.z * other.z;
	}

	mul (scalar) {
		return new Vector(this.x * scalar, this.y * scalar, this.z * scalar);
	}

	/**
	 *  Distance between this vector and another vector when both are treated as position vectors.
	 */
	distance (other) {
		return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2 + (this.z - other.z) ** 2);
	}

	get magnitude () {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	}

	normalized (desiredMagnitude = 1) {
		const mag = this.magnitude;
		if (mag === 0) return Vector.zero;
		const scaleFactor = desiredMagnitude / mag;
		return this.mul(scaleFactor);
	}
}

const zeroVector = new Vector(0, 0, 0);
Vector.zero = zeroVector;
