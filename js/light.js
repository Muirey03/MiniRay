export class Light {
	constructor (intensity) {
		this.intensity = intensity;
	}
}

export class PointLight extends Light {
	constructor (pos, intensity) {
		super(intensity);
		this.pos = pos;
	}
}

export class DirectionalLight extends Light {
	constructor (dir, intensity) {
		super(intensity);
		this.dir = dir;
	}
}
