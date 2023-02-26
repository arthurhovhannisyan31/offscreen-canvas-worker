import type { CanvasPayload } from "./types";

export const isHTMLCanvasElement =
  (canvas: CanvasPayload): canvas is HTMLCanvasElement => {
  return (canvas as HTMLCanvasElement).getContext !== undefined;
};

export const isImageFile =
  (message: CanvasPayload): message is File => {
  return /^image\/.+/.test((message as File).type);
};

export const isImageBitmapSource =
  (message: CanvasPayload): message is ImageData => {
    return (message as ImageData).data.byteLength > 0;
};

export const isSAB = (sab: any) : sab is SharedArrayBuffer=> {
  return (sab as SharedArrayBuffer)[Symbol.toStringTag] === "SharedArrayBuffer";
};
