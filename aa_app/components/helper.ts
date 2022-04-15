import { Area } from "react-easy-crop/types"
const CropPreview= async(ima: string, crop: Area, scale = 1, rotate = 0) =>{
  const createImage = (url:string) =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener("load", () => resolve(image));
		image.addEventListener("error", (error) => reject(error));
		image.setAttribute("crossOrigin", "anonymous"); 
		image.src = url;
	});
  const image:HTMLImageElement = await createImage(ima) as HTMLImageElement;
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const TO_RADIANS = Math.PI / 180
  let previewUrl = '';

  function toBlob(canvas: HTMLCanvasElement): Promise<Blob | null> {
  return new Promise(resolve => {
    canvas.toBlob(resolve)
  })
  }
  if (!ctx) {
    throw new Error('No 2d context')
  }

  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
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

  ctx.translate(-cropX, -cropY)
  ctx.translate(centerX, centerY)
  ctx.rotate(rotateRads)
  ctx.scale(scale, scale)
  ctx.translate(-centerX, -centerY)
  ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight, 0, 0, image.naturalWidth, image.naturalHeight)

  ctx.restore()
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
return file;
}
export default CropPreview;
