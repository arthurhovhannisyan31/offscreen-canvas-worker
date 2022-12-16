import { processImageData } from "./processImageData";

export function getFilteredImageData(
  context:CanvasRenderingContext2D | null,
  image: ImageData
): void {
  const imageData = context?.getImageData(0, 0, image.width, image.height);

  if (imageData){
    processImageData(imageData, 0.5);
  }
}
