import type { CanvasWorkerMessage } from "./types";

import { type CanvasWorkerDrawMessage } from "./types";

export const isHTMLCanvasElement =
  (canvas: CanvasWorkerMessage):
    canvas is Message<HTMLCanvasElement> => {
  return (canvas.data as HTMLCanvasElement).getContext !== undefined;
};

export const isImageFile =
  (bitMap: CanvasWorkerMessage): bitMap is CanvasWorkerDrawMessage => {
  return (bitMap.data as File).type === "image/jpeg";
};

export const isImageBitmapSource =
  (bitMap: CanvasWorkerMessage): bitMap is Message<ImageData> => {
    return (bitMap.data as ImageData).colorSpace !== undefined;
};
