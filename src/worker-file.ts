import { Mutex } from "./helpers/mutex";
import { WaitingGroup } from "./helpers/waiting-group";
import { AbstractWorker } from "./workers/common";

class WorkerFile extends AbstractWorker<any> {
  constructor(worker: any) {
    super(worker);
  }
  onMessage(message: Message): void {
    console.log("worker started", performance.now());
// Deserialize data.
    const { swg, smu, sc } = message.data;
    const wg = WaitingGroup.connect(swg);
    const mu = Mutex.connect(smu);
    const count = new Int32Array(sc);
// Do some stuff.
//     const rnd = (Math.random() * Math.floor(10))|0;
    mu.lock();
    console.log("start of critical section");
// This section does not require atomic operations, the mutex takes care of it.
// This allows to do complex operations with the guarantee that no other worker
// is in it. For example we could modify multiple sections of the array without
// worrying that some might have changed before we are done.
// This is a very simple example.
    count[0] = count[0] + 1;
// Load count[0] again, which won't have changed.
    console.log(`worker: ${count[0]}`);
    console.log("end of critical section");
    mu.unlock();
// Simulate intensive computation.
    for (let i=0;i<100000;i++);
// Signal termination.
    console.log("worker done", performance.now());
    wg.done();
  }
}

new WorkerFile(self as any);

export default {} as any;
