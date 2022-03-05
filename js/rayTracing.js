// rayTracing.js will be the entrypoint to the raytracing code. It will be separate from canvasRenderer.js as that will allow it to be used with ascii renderers etc.

export class RayTracing {
	constructor(buffer, width, height) {
		this.buffer = buffer;
		this.width = width;
		this.height = height;

		// DEBUG: draw a gradient circle:
		const centerX = width / 2;
		const centerY = height / 2;
		const radius = height / 4;
		for (let i = 0; i < buffer.length; i++) {
			let color = 0xff000000;
			const x = i % width;
			const y = Math.floor(i / width);
			if ((x - centerX)**2 + (y - centerY)**2 <= radius**2)
			{
				const brightness = (y - (height / 2 - radius)) / (2 * radius);
				const c = Math.floor(0xff * brightness);
				color = 0xff000000 + (c << 16) + (c << 8) + c;
			}
			buffer[i] = color;
		}
	}
}
