import { SceneObject } from './sceneObject.js';

export class PointLightObject extends SceneObject {
	constructor (pos, intensity) {
		super(pos);
		this.intensity = intensity;
	}
}
