import type { CanvasAction } from "../../types";

import { AbstractWorker } from "../../common";

export abstract class AbstractCanvasWorker
  extends AbstractWorker<CanvasAction> {
  previewCtx: CanvasRenderingContext2D | null = null;

  protected constructor(worker: DedicatedWorkerGlobalScope) {
    super(worker);
  }

  setContext(message: Message<HTMLCanvasElement>):void {
    const canvas = message.data;
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: Message<File|ImageData>): Promise<void>;

  abstract processMessage(message: Message<CanvasAction>): void;
}
