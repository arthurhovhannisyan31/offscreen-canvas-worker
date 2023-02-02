import { useContext, useEffect } from "react";

import { ModuleWorkerContext } from "../../../context";
import { getMainModuleWorker } from "../../../workers/module-worker";

export const useModuleWorkerInit = (): void => {
  const { worker, setWorker } = useContext(ModuleWorkerContext);

  useEffect(() => {
    if (!worker){
      const moduleWorker = getMainModuleWorker();

      setWorker(moduleWorker);
    }
  }, [worker, setWorker]);
};
