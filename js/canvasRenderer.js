const canvas = document.querySelector("#canvas");
const width = canvas.width;
const height = canvas.height;

const ctx = canvas.getContext('2d');
const pixelData = ctx.createImageData(width, height);
let pixelBuffer = new Uint32Array(pixelData.data.buffer);

// this is our tick function:
setInterval(() => {
	ctx.putImageData(pixelData, 0, 0);
}, 1000 / 60);

// to change the data in the canvas we just write our GBR values to pixelBuffer and call putImageData

// DEBUG: initialise canvas with random pixels:
for (let i = 0; i < pixelBuffer.length; i++) {
	pixelBuffer[i] = 0xff000000 + Math.random() * 0xFFFFFF;
}

// DEBUG: set canvas to red after 2s:
setTimeout(() => {
	for (let i = 0; i < pixelBuffer.length; i++) {
		pixelBuffer[i] = 0xff0000ff; // RED
	}
}, 2000);
