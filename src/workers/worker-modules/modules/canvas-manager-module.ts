import { Subject } from "../../common";
import { AbstractSubjectModule } from "../abstract-modules/abstract-subject-module";

type CanvasManagerModuleAction = Action<any>;

export class CanvasManagerModule
  extends AbstractSubjectModule<CanvasManagerModuleAction>{
  subject = new Subject();

  constructor() {
    super();

    this.init();
  }

  init():void{
    // add main canvas
    // add satellite canvases
  }

  update(message: CanvasManagerModuleAction): void{
    // if message is canvas module initiation process
    // if not send to modules
    this.subject.notify(message);
  }
}
