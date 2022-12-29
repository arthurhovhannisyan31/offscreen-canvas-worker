import type {
  CanvasWorkerContextMessage,
  CanvasWorkerDrawMessage,
  CanvasWorkerAction
} from "../../types";

import { AbstractWorker } from "../../common/workers";

export abstract class AbstractCanvasWorker
  extends AbstractWorker<CanvasWorkerAction> {
  previewCtx: CanvasRenderingContext2D | null = null;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  setContext(message: CanvasWorkerContextMessage):void {
    const canvas = message.data;
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: CanvasWorkerDrawMessage): Promise<void>;

  abstract processMessage(message: Message<CanvasWorkerAction>): void;
}
