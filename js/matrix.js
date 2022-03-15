import { Vector } from "./vector.js";

export class Matrix {
	constructor (col1 = new Vector(0, 0, 0), col2 = new Vector(0, 0, 0), col3 = new Vector(0, 0, 0)) {
        this.col1 = col1;
        this.col2 = col2;
        this.col3 = col3;
	}

	add (other) {
		return new Vector(this.col1.add(other.col1), this.col2.add(other.col2), this.col3.add(other.col3));
	}

	sub (other) {
		return new Vector(this.col1.sub(other.col1), this.col2.sub(other.col2), this.col3.sub(other.col3));
	}

	vect_mul (vect) {
	    return this.col1.mul(vect.x).add(this.col2.mul(vect.y)).add(this.col3.mul(vect.z))
	}

    scale_mul (scalar) {
        return new Vector(this.col1.mul(scalar), this.col2.mul(scalar), this.col3.mul(scalar));
    }

}
