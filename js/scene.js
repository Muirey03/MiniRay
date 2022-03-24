export class Scene {
	constructor () {
		this.objects = new Set();
		this.lights = new Set();
	}

	addObject (obj) {
		this.objects.add(obj);
		obj.scene = this;
	}

	addLight (light) {
		this.lights.add(light);
		light.scene = this;
	}
}
