import type { WorkerActivityStatus } from "../../workers/common/types";

export interface WorkerControlsProps {
  fpsModuleActive: boolean;
  twinsModuleActive: boolean;
  statusLog: WorkerActivityStatus[];
  worker: Worker | undefined;
}
