export type CanvasElementMessage = Message<HTMLCanvasElement>;
export type FileMessage = Message<File>;
export type ImageDataMessage = Message<ImageData>;

export type CanvasMessage =
  | CanvasElementMessage
  | FileMessage
  | ImageDataMessage

export type CanvasAction = Action<CanvasMessage>
