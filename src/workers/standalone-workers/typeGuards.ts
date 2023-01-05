import type { CanvasManagerMessageType } from "./managers/canvas-manager-types";
import type { ProcessImageWorkerManagerAction } from "./managers/process-image-worker-manager";
import type { ArrayBufferViewMessage } from "./types";

export const isArrayBufferViewMessage =
  (data: CanvasManagerMessageType["data"]):
    data is ProcessImageWorkerManagerAction => {
  return (data.payload.data as ArrayBufferViewMessage).data.byteLength > 0;
};
