import { WaitingGroup } from "./helpers/waiting-group";
import { AbstractWorker } from "./workers/common";

class Waiter extends AbstractWorker<any>{
  constructor(worker: any) {
    super(worker);
    console.log("waiter created", performance.now());
  }
  onMessage(messagge: Message): void {
    console.log("waiter started");
// Deserialize data.
    const { swg, sc } = messagge.data;
    const wg = WaitingGroup.connect(swg);
    const count = new Int32Array(sc);
// Wait for workers to terminate.
    wg.wait();
// The following lines will always execute last.
    const wgCount = new Int32Array(wg._sab)[0];
    console.log("final value:", `count ${count[0]}`, `${wgCount}`, performance.now());
    console.log("waiter done", performance.now());
  }
}

new Waiter(self as any);

export default {} as any;
