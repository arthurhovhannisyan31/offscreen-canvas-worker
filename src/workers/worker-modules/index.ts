import MainWorker from "./main-worker?worker";

export const getMainModuleWorker = (): Worker => new MainWorker();
