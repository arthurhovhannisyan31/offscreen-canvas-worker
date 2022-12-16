export function drawToCanvas(
  context:CanvasRenderingContext2D | null,
  imageData: ImageData
):void {
  context?.putImageData(imageData, 0, 0);
}
export function drawMainCanvasBitMap(
  context: CanvasRenderingContext2D | null,
  bitMap: CanvasImageSource
):void {
  context?.drawImage(bitMap, 0, 0);
}
