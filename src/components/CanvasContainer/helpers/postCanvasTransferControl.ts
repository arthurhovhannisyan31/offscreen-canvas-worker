import { createAction } from "../../../workers/common";

export const postCanvasTransferControl = (
  canvas: HTMLCanvasElement,
  action: string,
  worker: Worker
): void => {
  const canvasControl = canvas.transferControlToOffscreen();
  worker.postMessage(
    createAction(action, { data: canvasControl }),
    [canvasControl]
  );
};
