import MainModuleWorker from "./main-module-worker?worker";

export const getMainModuleWorker = (): Worker => new MainModuleWorker();
