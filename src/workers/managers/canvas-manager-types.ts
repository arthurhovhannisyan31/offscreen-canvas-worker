import type { CanvasWorkerManagerAction } from "./canvas-worker-manager";
import type { ProcessImageWorkerManagerAction } from "./process-image-worker-manager";

export type CanvasManagerMessageType =
  | Message<CanvasWorkerManagerAction>
  | Message<ProcessImageWorkerManagerAction>
;
