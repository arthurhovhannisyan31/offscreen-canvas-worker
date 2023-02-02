import { useContext, useEffect, useRef } from "react";

import { ModuleWorkerContext } from "../../../context";
import { getMainModuleWorker } from "../../../workers/module-worker";

export const useModuleWorkerInit = (): void => {
  const workerRef = useRef<Worker | null>(null);
  const { setWorker } = useContext(ModuleWorkerContext);

  useEffect(() => {
    if (!workerRef.current){
      workerRef.current = getMainModuleWorker();

      setWorker(workerRef.current);
    }
  }, [setWorker]);
};
