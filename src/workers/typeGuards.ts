import type { CanvasMessage } from "./types";

export const isHTMLCanvasElement =
  (canvas: unknown): canvas is HTMLCanvasElement => {
  return (canvas as HTMLCanvasElement).getContext !== undefined;
};

export const isImageFile =
  (message: CanvasMessage): message is Message<File> => {
  return /^image\/.+/.test((message.data as File).type);
};

export const isImageBitmapSource =
  (message: CanvasMessage): message is Message<ImageData> => {
    return (message.data as ImageData).data.byteLength > 0;
};
