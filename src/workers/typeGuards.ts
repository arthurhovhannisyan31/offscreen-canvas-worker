import type { CanvasWorkerMessage , ProcessFileMessage, ProcessImageMessage } from "./types";

export const isHTMLCanvasElement =
  (canvas: CanvasWorkerMessage):
    canvas is Message<HTMLCanvasElement> => {
  return (canvas.data as HTMLCanvasElement).getContext !== undefined;
};

export const isImageFile =
  (bitMap: CanvasWorkerMessage): bitMap is ProcessFileMessage => {
  return (bitMap.data as File).type === "image/jpeg";
};

export const isImageBitmapSource =
  (bitMap: CanvasWorkerMessage): bitMap is ProcessImageMessage => {
    return (bitMap.data as ImageData).data.byteLength > 0;
};
