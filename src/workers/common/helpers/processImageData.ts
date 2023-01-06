export function processImageData(image: ImageData):void {
  const rand = randomNumber(0, 3);
  for (let x = 0; x < image.width; x++) {
    for (let y = 0; y < image.height; y++) {
      const idx = (x + y * image.width) * 4;
      image.data[idx + rand] *= modeMultipliers[rand];
    }
  }
}

function randomNumber(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const modeMultipliers: Record<number, number> = {
  0: 2,
  1: 2,
  2: 2,
  3: 0.5
};
