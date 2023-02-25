export interface SetDataPayload {
  canvas: HTMLCanvasElement;
  fpsSAB: SharedArrayBuffer;
}

export type SetDataAction = Action<SetDataPayload>;
