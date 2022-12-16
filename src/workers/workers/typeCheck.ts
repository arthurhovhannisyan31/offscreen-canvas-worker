import type { CanvasWorkerMessage } from "./types";

export const isHTMLCanvasElement =
  (canvas: CanvasWorkerMessage):
    canvas is Message<HTMLCanvasElement> => {
  return (canvas.data as HTMLCanvasElement).getContext !== undefined;
};

export const isImageBitmapSource =
  (bitMap: CanvasWorkerMessage): bitMap is Message<ImageData> => {
  return (bitMap.data as ImageData).colorSpace !== undefined;
};
