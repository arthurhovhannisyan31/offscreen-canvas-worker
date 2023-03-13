import type { WorkerActivityStatus, ModuleStatus } from "../../workers/common/types";

import { type ModuleWorkerProperty } from "../../store/moduleWorkerStore";

export interface WorkerControlsProps {
  fpsModuleStatus: ModuleStatus;
  twinsModuleStatus: ModuleStatus;
  statusLog: WorkerActivityStatus[];
  setModuleStatus: (moduleName: ModuleWorkerProperty, status: ModuleStatus) => void;
  worker: Worker | undefined;
}
