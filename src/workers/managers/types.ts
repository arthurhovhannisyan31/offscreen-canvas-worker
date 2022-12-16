export type BoxedArrayBufferView = Message<ArrayBufferView>;

export interface CanvasMessage {
  data: Action<{
    data: BoxedArrayBufferView
  }>
}

