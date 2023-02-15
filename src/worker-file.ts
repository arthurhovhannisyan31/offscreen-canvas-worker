import { Mutex } from "./helpers/mutex";
import { WaitingGroup } from "./helpers/waiting-group";
import { AbstractWorker } from "./workers/common";

class WorkerFile extends AbstractWorker<any> {
  name = "";

  constructor(worker: any) {
    super(worker);
  }
  onMessage(message: Message): void {
// Deserialize data.
    const { swg, smu, sc } = message.data;
    const count = new Int32Array(sc);
    this.name = `worker ${count}`;
    console.log(`${this.name} started`, performance.now());

    const wg = WaitingGroup.connect(swg);
    const mu = Mutex.connect(smu, this.name);
// Do some stuff.
//     const rnd = (Math.random() * Math.floor(10))|0;
    mu.lock();
    console.log(`${this.name} start of critical section`);
// This section does not require atomic operations, the mutex takes care of it.
// This allows to do complex operations with the guarantee that no other worker
// is in it. For example we could modify multiple sections of the array without
// worrying that some might have changed before we are done.
// This is a very simple example.
    count[0] = count[0] + 1;
// Load count[0] again, which won't have changed.
    console.log(`${this.name}: count value ${count[0]}`);
    console.log(`${this.name} end of critical section`);
    let rand = 0;
// Simulate intensive computation.
    for (let i=0;i<1000000;i++){
      rand += Math.random();
    }
    console.log(`${this.name} rand value: ${rand}`);
    mu.unlock();
// Signal termination.
    console.log(`${this.name} done`, performance.now());
    wg.done();
  }
}

new WorkerFile(self as any);

export default {} as any;
