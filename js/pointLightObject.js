import { SceneObject } from './sceneObject.js';

export class pointLightObject extends SceneObject {
	constructor (pos, intensity) {
		super(pos);
        this.intensity = intensity;
	}
}