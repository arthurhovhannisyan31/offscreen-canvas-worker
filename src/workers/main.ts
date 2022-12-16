import CanvasManager from "./managers/canvas-manager";

export const getMainWorker = (canvas: HTMLCanvasElement):CanvasManager => {
  return new CanvasManager(canvas);
};
