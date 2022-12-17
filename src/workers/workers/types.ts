export type CanvasWorkerContextMessage = Message<HTMLCanvasElement>;
export type CanvasWorkerDrawMessage = Message<ImageData>;

export type CanvasWorkerMessage =
  | Message<HTMLCanvasElement>
  | Message<File|ImageData>

export type CanvasWorkerAction = Action<CanvasWorkerMessage>
