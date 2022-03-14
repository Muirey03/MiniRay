import { RayTracing } from './rayTracing.js';

const width = Math.floor(process.stdout.columns / 2) - 10;
const height = process.stdout.rows - 10;
const pixelBuffer = new Uint32Array(width * height);

function printBuffer (buffer) {
	// const densityStr = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
	const densityStr = '@%#*+=-:. ';

	console.log('\x1B[0;0H'); // reset cursor to 0,0
	let s = '';
	for (let i = 0; i < buffer.length; i++) {
		const abgr = buffer[i];
		const r = abgr & 0xff;
		const g = (abgr & 0xff00) >> 8;
		const b = (abgr & 0xff0000) >> 16;
		const avg = (r + g + b) / 3;
		const idx = Math.ceil((1 - (avg / 0xff)) * (densityStr.length - 1));
		s += densityStr[idx] + densityStr[idx];

		// print newline:
		if ((i + 1) % width === 0) { s += '\n'; }
	}
	console.log(s + '\x1B[0;0H');
}

// this is our tick function:
const FPS = 60;
console.clear(); // clear screen
setInterval(() => {
	printBuffer(pixelBuffer);
}, 1000 / FPS);

// the ray tracing engine gets given the pixel buffer to draw to:
new RayTracing(pixelBuffer, width, height); // eslint-disable-line no-new

process.on('SIGINT', () => {
	console.log(`\x1B[${height + 2};0H`);
	process.exit();
});
