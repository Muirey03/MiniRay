export class ColourVector {
	constructor (r, g, b) {
		this.r = r;
		this.g = g;
		this.b = b;
	}

	mul (scalar) {
		return new ColourVector(Math.round(this.r * scalar), Math.round(this.g * scalar), Math.round(this.b * scalar));
	}

	getColour () {
		// Built on (alpha)(B)(G)(R), doing this so code can use RGB order instead
		return ((255 * (16 ** 6)) + (this.b * (16 ** 4)) + (this.g * (16 ** 2)) + this.r);
	}
}
