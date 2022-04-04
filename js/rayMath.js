/**
 * If solutions exist - returns an array of [solution1, solution2].
 * Else - returns [NaN, NaN].
 */
function quadraticSolve (a, b, c) {
	const discriminant = Math.sqrt(b * b - 4 * a * c);
	const denominator = 2 * a;
	const solution1 = (-b - discriminant) / denominator;
	const solution2 = (-b + discriminant) / denominator;
	return [solution1, solution2];
}

/**
 * Returns an array of the point(s) (if any) of intersection. Only those in the positive direction of the ray vector are returned. If two points are returned the first is the closer of the two.
 * Adapted from https://math.stackexchange.com/a/1939462.
 */
export function intersectVectorWithSphere (rayOrigin, rayVector, sphereCenter, sphereRadius) {
	const unitRayVector = rayVector.normalized();
	const differenceVector = rayOrigin.sub(sphereCenter);

	const a = 1; // Same as unitRayVector.dot(unitRayVector); as it is a unit vector.
	const b = 2 * unitRayVector.dot(differenceVector);
	const c = differenceVector.dot(differenceVector) - sphereRadius * sphereRadius;

	const quadratricResult = quadraticSolve(a, b, c);

	const intersections = [];

	const distance1 = quadratricResult[0];
	const distance2 = quadratricResult[1];
	if (distance1 >= 0) { // Note this won't execute for NaN values.
		intersections.push({ point: unitRayVector.mul(distance1).add(rayOrigin), distance: distance1 });
	}
	if (distance2 >= 0) { // Note this won't execute for NaN values.
		intersections.push({ point: unitRayVector.mul(distance2).add(rayOrigin), distance: distance2 });
	}

	return intersections;
}

export function intersectVectorWithPlane (rayOrigin, rayVector, planeCenter, planeNormal, planeRadius) {
	const unitRayVector = rayVector.normalized();
	const constant = planeCenter.dot(planeNormal);

	const distance = (constant - planeNormal.dot(rayOrigin)) / planeNormal.dot(rayVector);
	if (distance <= 0) return [];
	const point = unitRayVector.mul(distance).add(rayOrigin);
	const diff = planeCenter.sub(point);
	if (planeRadius === Infinity || diff.magnitude <= planeRadius) {
		return [{ point: point, distance: distance }];
	}
	return [];
}
