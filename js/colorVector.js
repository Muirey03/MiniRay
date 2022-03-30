export class ColorVector {
	constructor (r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	// Taken from https://www.webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
	clamp (num, min, max) {
		return Math.min(Math.max(num, min), max);
	}

	mul (scalar) {
		// Restrict RGB channels between 0 and 255
		const newR = this.clamp(Math.round(this.r * scalar), 0, 255);
		const newG = this.clamp(Math.round(this.g * scalar), 0, 255);
		const newB = this.clamp(Math.round(this.b * scalar), 0, 255);
		return new ColorVector(newR, newG, newB);
	}

	getReverseHexColor () {
		// Built on (alpha)(B)(G)(R), doing this so code can use RGB order instead
		return ((255 * (16 ** 6)) + (this.b * (16 ** 4)) + (this.g * (16 ** 2)) + this.r);
	}
}
