import type {
  CanvasContextMessage,
  CanvasDrawMessage,
  CanvasAction
} from "../../types";

import { AbstractWorker } from "../../common/workers";

export abstract class AbstractCanvasWorker
  extends AbstractWorker<CanvasAction> {
  previewCtx: CanvasRenderingContext2D | null = null;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  setContext(message: CanvasContextMessage):void {
    const canvas = message.data;
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: CanvasDrawMessage): Promise<void>;

  abstract processMessage(message: Message<CanvasAction>): void;
}
