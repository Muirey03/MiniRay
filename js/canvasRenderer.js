import { RayTracing } from './rayTracing.js';

const canvas = document.querySelector("#canvas");
const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext('2d');
const pixelData = ctx.createImageData(width, height);
let pixelBuffer = new Uint32Array(pixelData.data.buffer);

// this is our tick function:
const FPS = 60;
setInterval(() => {
	ctx.putImageData(pixelData, 0, 0);
}, 1000 / FPS);

// the ray tracing engine gets given the pixel buffer to draw to:
const rayTracing = new RayTracing(pixelBuffer, width, height);
