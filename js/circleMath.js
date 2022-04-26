import { Vector } from './vector.js';

export function pointAroundCircle (percent) {
	const distanceAroundCircle = percent * 2 * Math.PI;
	return new Vector(Math.cos(distanceAroundCircle) / 2, Math.sin(distanceAroundCircle) / 2);
}
