export class Scene {
	constructor () {
		this.objects = new Set();
	}

	addObject (obj) {
		this.objects.add(obj);
		obj.scene = this;
	}
}
