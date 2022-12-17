import { type CanvasManagerMessageType } from "./canvas-manager-types";
import { type ProcessImageWorkerManagerAction } from "./process-image-worker-manager";
import { type ArrayBufferViewMessage } from "./types";

export const isArrayBufferViewMessage =
  (data: CanvasManagerMessageType["data"]):
    data is ProcessImageWorkerManagerAction => {
  return (data.payload.data as ArrayBufferViewMessage).data.byteLength > 0;
};
