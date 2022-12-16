export function processImageData(image: ImageData, alpha: number):void {
  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      const idx = (x + y * image.width) * 4;
      image.data[idx + 3] *= alpha;
      image.data[idx] *= 1.5;
    }
  }
}
