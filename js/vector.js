export class Vector {
	constructor (x, y, z = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	static get zero () {
		return new Vector(0, 0, 0);
	}

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

	get magnitude () {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
	}

	normalized (desiredMagnitude = 1) {
		const mag = this.magnitude;
		if (mag === 0) return Vector.zero;
		return new Vector(this.x * desiredMagnitude / mag, this.y * desiredMagnitude / mag, this.z * desiredMagnitude / mag);
	}
}
