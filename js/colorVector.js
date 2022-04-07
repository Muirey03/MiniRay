// Taken from https://www.webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
function clamp (num, min, max) {
	return Math.min(Math.max(num, min), max);
}

export class ColorVector {
	constructor (r, g, b) {
		// Restrict RGB channels between 0 and 255
		this.r = clamp(r, 0, 255);
		this.g = clamp(g, 0, 255);
		this.b = clamp(b, 0, 255);
	}

	static get black () {
		return new ColorVector(0, 0, 0);
	}

	static get white () {
		return new ColorVector(1, 1, 1);
	}

	add (other) {
		return new ColorVector(
			this.r + other.r,
			this.g + other.g,
			this.b + other.b
		);
	}

	sub (other) {
		return new ColorVector(
			this.r - other.r,
			this.g - other.g,
			this.b - other.b
		);
	}

	mul (scalar) {
		return new ColorVector(
			Math.round(this.r * scalar),
			Math.round(this.g * scalar),
			Math.round(this.b * scalar)
		);
	}

	lerp (other, amount) {
		return new ColorVector(
			this.r * (1 - amount) + other.r * amount,
			this.g * (1 - amount) + other.g * amount,
			this.b * (1 - amount) + other.b * amount
		);
	}

	getReverseHexColor () {
		// Built on (alpha)(B)(G)(R), doing this so code can use RGB order instead
		return 0xff000000 + (this.b << 16) + (this.g << 8) + this.r;
	}
}
