import { Area } from "react-easy-crop/types"
export interface Crop {
  x: number
  y: number
  width: number
  height: number
  unit: 'px' | '%'
}

export interface PixelCrop extends Crop {
  unit: 'px'
}

const TO_RADIANS = Math.PI / 180
let previewUrl = ''

function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise(resolve => {
    canvas.toBlob(resolve)
  })
}
const createImage = (url:string) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

export async function cropPreview(ima: string, crop: Area, scale = 1, rotate = 0) {
  const image:HTMLImageElement = await createImage(ima) as HTMLImageElement;
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  // const pixelRatio = window.devicePixelRatio || 1
  const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio)

  ctx.scale(pixelRatio, pixelRatio)
  ctx.imageSmoothingQuality = 'high'

  const cropX = crop.x * scaleX
  const cropY = crop.y * scaleY

  const rotateRads = rotate * TO_RADIANS
  const centerX = image.naturalWidth / 2
  const centerY = image.naturalHeight / 2

  ctx.save()

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY)
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY)
  // 3) Rotate around the origin
  ctx.rotate(rotateRads)
  // 2) Scaled the image
  ctx.scale(scale, scale)
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight)

  ctx.restore()

  // It's quicker to render out the canvas but the image resizes
  // nicely to aspect (might be poss with CSS aspect-ratio)
  // and is easily downloaded if desired.
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl)
  }

  const blob = await toBlob(canvas)
    const part:BlobPart[]=[];
    part.push(blob as BlobPart);
  if (!blob) {
    previewUrl = ''
    return ''
  }
const file=new File(part,"profile");
  // previewUrl = canvas.toDataURL("mime");
  return file;
}