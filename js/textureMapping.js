import { Vector } from './vector.js';

// adapted from http://raytracerchallenge.com/bonus/texture-mapping.html
export function sphericalMap (p) {
	const theta = Math.atan2(p.x, p.y);
	const vec = new Vector(p.x, p.z, p.y);
	const radius = vec.magnitude;

	const phi = Math.acos(p.z / radius);
	const rawU = theta / (2 * Math.PI);
	const u = rawU + 0.5;
	const v = phi / Math.PI;
	return new Vector(u, v);
}

// TODO: this assumes that the normalVec = z
export function planarMap (p) {
	const u = p.x % 1;
	const v = p.y % 1;
	return new Vector(u < 0 ? u + 1 : u, v < 0 ? v + 1 : v);
}
