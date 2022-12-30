export type CanvasContextMessage = Message<HTMLCanvasElement>;
export interface ProcessImageMessage extends Message<ImageData> {
  alpha: number;
}
export type ProcessFileMessage = Message<File>;
export type CanvasDrawMessage = ProcessFileMessage | ProcessImageMessage

export type CanvasWorkerMessage =
  | Message<HTMLCanvasElement>
  | ProcessFileMessage | ProcessImageMessage

export type CanvasAction = Action<CanvasWorkerMessage>
