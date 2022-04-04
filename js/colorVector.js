// Taken from https://www.webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
function clamp (num, min, max) {
	return Math.min(Math.max(num, min), max);
}

export class ColorVector {
	constructor (r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	static get black () {
		return new ColorVector(0, 0, 0);
	}

	mul (scalar) {
		// Restrict RGB channels between 0 and 255
		const newR = clamp(Math.round(this.r * scalar), 0, 255);
		const newG = clamp(Math.round(this.g * scalar), 0, 255);
		const newB = clamp(Math.round(this.b * scalar), 0, 255);
		return new ColorVector(newR, newG, newB);
	}

	getReverseHexColor () {
		// Built on (alpha)(B)(G)(R), doing this so code can use RGB order instead
		return 0xff000000 + (this.b << 16) + (this.g << 8) + this.r;
	}
}
