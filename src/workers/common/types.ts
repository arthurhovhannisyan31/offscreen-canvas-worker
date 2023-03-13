export enum ModuleStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  PENDING = "PENDING"
}

export interface WorkerActivityStatus {
  status: ModuleStatus;
  timestamp: number;
  message: string;
}
