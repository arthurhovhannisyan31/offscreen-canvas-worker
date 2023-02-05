import { Mutex } from "./helpers/mutex";
import { WaitingGroup } from "./helpers/waiting-group";
import Waiter from "./waiter?worker";
import WorkerFile from "./worker-file?worker";

const workers = [];
// The only one SAB for storing count value
const sab = new SharedArrayBuffer(4);
/*
* The only one mutex with SAB
* Used only in workers
* */
const mu = new Mutex();
// Warning: using a number that is too high might crash your browser.
const size = 3;
// The only one waiting group with SAB
const wg = new WaitingGroup(size);
// Start the waiter
const waiter = new Waiter();
waiter.postMessage({ swg:wg, sc:sab });
// Spawn a group of workers.
for (let i = 0; i < size; i++) {
  workers.push(new WorkerFile());
}
// Start the work.
for (const w of workers){
  w.postMessage({ swg:wg, smu:mu, sc:sab });
}
