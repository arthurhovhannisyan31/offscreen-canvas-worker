import type { CanvasAction } from "../../types";

import { AbstractModule } from "./abstract-module";

export abstract class AbstractCanvasModule extends AbstractModule<CanvasAction>{
  previewCtx: CanvasRenderingContext2D | null = null;

  setContext(message: Message<HTMLCanvasElement>):void {
    const canvas = message.data;
    this.previewCtx = canvas.getContext("2d");
  }

  abstract draw(image: Message<File|ImageData>): Promise<void>;
}
