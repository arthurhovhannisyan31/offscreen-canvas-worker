export type CanvasPayload =
  | HTMLCanvasElement
  | File
  | ImageData

export type CanvasAction = Action<CanvasPayload>
