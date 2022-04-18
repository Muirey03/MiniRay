import { ColorVector } from './colorVector.js';

let getPixels = null;

function getImageData (img) {
	const canvas = document.createElement('canvas');
	canvas.width = img.width;
	canvas.height = img.height;
	const ctx = canvas.getContext('2d');
	ctx.drawImage(img, 0, 0);
	return ctx.getImageData(0, 0, img.width, img.height);
}

async function loadImage (url) {
	if (typeof Image !== 'undefined') {
		return new Promise(resolve => {
			const img = new Image();
			img.src = url;
			img.onload = () => {
				resolve(getImageData(img));
			};
		});
	} else {
		return new Promise(resolve => {
			(async () => {
				if (!getPixels) {
					getPixels = (await import('get-pixels')).default;
				}
				getPixels(url, (_, pixels) => {
					resolve({
						data: pixels.data,
						width: pixels.shape[0],
						height: pixels.shape[1]
					});
				});
			})();
		});
	}
}

export class Material {
	// don't use contructor directly, use newMaterial or newColorMaterial instead
	constructor (specular, reflectivity) {
		this.specular = specular;
		this.reflectivity = reflectivity;
	}

	static async newMaterial (url, scale, specular, reflectivity, xRotation = 0) {
		const mat = new Material(specular, reflectivity);
		mat.imgData = await loadImage(url);
		mat.scale = scale;
		xRotation %= 1;
		mat.xRotation = xRotation < 0 ? xRotation + 1 : xRotation;
		return mat;
	}

	static newColorMaterial (color, specular, reflectivity) {
		return new ColorMaterial(specular, reflectivity, color);
	}

	colorAtUV (UV) {
		UV.x = ((UV.x + this.xRotation) * this.scale) % 1;
		UV.y = (UV.y * this.scale) % 1;
		const width = this.imgData.width;
		const height = this.imgData.height;
		const x = Math.floor(UV.x * width);
		const y = Math.floor(UV.y * height);
		const r = this.imgData.data[(y * width + x) * 4];
		const g = this.imgData.data[(y * width + x) * 4 + 1];
		const b = this.imgData.data[(y * width + x) * 4 + 2];
		return new ColorVector(r, g, b);
	}
}

class ColorMaterial extends Material {
	constructor (specular, reflectivity, color) {
		super(specular, reflectivity);
		this.color = color;
	}

	colorAtUV (UV) {
		return this.color;
	}
}
