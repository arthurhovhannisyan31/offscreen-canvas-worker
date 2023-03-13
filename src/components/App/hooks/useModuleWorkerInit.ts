import { useContext, useEffect, useRef } from "react";

import { ModuleWorkerContext } from "../../../context";
import { storeSubject } from "../../../store/storeSubject";
import { getMainModuleWorker } from "../../../workers/module-worker";

export const useModuleWorkerInit = (): void => {
  const workerRef = useRef<Worker | null>(null);
  const { setWorker } = useContext(ModuleWorkerContext);

  useEffect(() => {
    if (!workerRef.current){
      workerRef.current = getMainModuleWorker();
      if (workerRef.current){
        workerRef.current.onmessage = (message) => {
          storeSubject.notify(message.data);
        };
      }
      setWorker(workerRef.current);
    }
  }, [setWorker]);
};
