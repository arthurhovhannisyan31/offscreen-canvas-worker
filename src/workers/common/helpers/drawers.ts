export function putImageData(
  context:CanvasRenderingContext2D | null,
  imageData: ImageData
):void {
  context?.putImageData(imageData, 0, 0);
}
export function drawImage(
  context: CanvasRenderingContext2D | null,
  bitMap: CanvasImageSource
):void {
  context?.drawImage(bitMap, 0, 0);
}
