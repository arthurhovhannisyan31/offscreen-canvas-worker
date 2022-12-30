import { MAIN_INIT, type Observer, SATELLITE_INIT, Subject } from "../../common";
import { AbstractSubjectModule } from "../abstract-modules/abstract-subject-module";
import { MainOffscreenModule } from "./main-offscreen-module";
import { SatelliteOffscreenModule } from "./satellite-offscreen-module";

// type TransferControlAction = Action<OffscreenCanvas>;

type CanvasManagerModuleAction = Action<any>;

export class CanvasManagerModule
  extends AbstractSubjectModule<CanvasManagerModuleAction>{
  subject = new Subject();

  constructor(postMessage: Worker["postMessage"]) {
    super(postMessage);
  }

  initModules(message: CanvasManagerModuleAction):void{
    let observer: Observer<any> | undefined;
    switch (message.type){
      case(MAIN_INIT): {
        observer = new MainOffscreenModule(this.update);
        break;
      }
      // TODO make multiple satellite modules
      case(SATELLITE_INIT): {
        observer = new SatelliteOffscreenModule(this.update);
        break;
      }
    }
    if (observer){
      this.subject.addObserver(observer);
    }
  }

  async fetchData(): Promise<void> {
    const response = await fetch("https://picsum.photos/300/150");
    const blob = await response.blob();
    const file = new File([blob], "my_image.png",{ type:"image/jpeg", lastModified:new Date().getTime() });
    // notify all observers
    console.log(file);
    setTimeout(() => {
      this.fetchData();
    }, 5000);
  }

  update(message: CanvasManagerModuleAction): void{
    if ([MAIN_INIT,SATELLITE_INIT].includes(message.type)){
      this.initModules(message);
    }
    // either postMessage, send up
    // either updateObservers, send to siblings
  }
}
