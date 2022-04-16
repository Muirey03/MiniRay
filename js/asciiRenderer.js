import { RayTracing } from './rayTracing.js';

const rows = process.stdout.rows - 10;
const cols = process.stdout.columns - 10;
const charsPerPx = 0.0005686 * cols + 1.899; // constants found using linear regression
const width = Math.floor((cols - 10) / charsPerPx);
const height = rows;
const pixelBuffer = new Uint32Array(width * height);

function printBuffer (buffer) {
	// const densityStr = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
	const densityStr = '@%#*+=-:. ';

	console.log('\x1B[0;0H'); // reset cursor to 0,0
	let s = '';

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const i = y * width + Math.floor((x / cols) * width);
			const abgr = buffer[i];
			const r = abgr & 0xff;
			const g = (abgr & 0xff00) >> 8;
			const b = (abgr & 0xff0000) >> 16;
			const avg = (r + g + b) / 3;
			const densityIdx = Math.floor((1 - (avg / 0xff)) * (densityStr.length - 1));
			s += densityStr[densityIdx];
		}
		s += '\n';
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
