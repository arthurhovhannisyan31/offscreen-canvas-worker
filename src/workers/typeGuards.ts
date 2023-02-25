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

export const isSimpleAction = (action: any): action is SimpleAction => {
  return (action as Action<any>).payload === undefined;
};

export const isAction = <T>(action: Action<T>): action is Action<T>=> {
  return action.payload !== undefined;
};
