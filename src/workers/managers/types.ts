export type BoxedArrayBufferView = BoxedType<ArrayBufferView>;

export interface CanvasMessage {
  data: Action<{
    data: BoxedArrayBufferView
  }>
}

