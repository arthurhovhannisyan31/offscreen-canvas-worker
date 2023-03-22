export interface SetDataPayload {
  canvas: HTMLCanvasElement;
  fpsSAB: SharedArrayBuffer;
  timeOrigin: number;
}

export type SetDataAction = Action<SetDataPayload>;
