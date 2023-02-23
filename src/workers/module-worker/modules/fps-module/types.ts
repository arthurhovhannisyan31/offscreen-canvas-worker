export interface SetDataPayload {
  canvas: HTMLCanvasElement;
  fpsSAB: SharedArrayBuffer;
}

export type SetDataMessage = Message<SetDataPayload>;
export type SetDataAction = Action<SetDataMessage>;
