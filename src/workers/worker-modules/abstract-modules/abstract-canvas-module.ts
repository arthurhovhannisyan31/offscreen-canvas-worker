import type { CanvasAction, CanvasContextMessage, CanvasDrawMessage } from "../../types";

import { AbstractModule } from "./abstract-module";

export abstract class AbstractCanvasModule extends
  AbstractModule<Message<CanvasAction>>{
  previewCtx: CanvasRenderingContext2D | null = null;

  setContext(message: CanvasContextMessage):void {
    const canvas = message.data;
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: CanvasDrawMessage): Promise<void>;
}
