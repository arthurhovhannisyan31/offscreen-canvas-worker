import type { ModuleWorkerStore } from "../../store/moduleWorkerStore";

export interface WorkerControlsProps {
  fpsModuleActive: boolean;
  twinsModuleActive: boolean;
  setModuleWorkerStatus: ModuleWorkerStore["setModuleStatus"];
  toggleAllWorkers: ModuleWorkerStore["toggleAllWorkers"];
}
