import type { ProcessImageWorkerManagerAction } from "./process-image-worker-manager";

export type CanvasManagerMessageType = Message<
  | Action<Message<File|ImageData>>
  | ProcessImageWorkerManagerAction
>;
