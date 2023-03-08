import {
  useState,
  createContext,
  useCallback,
  useMemo,
  type PropsWithChildren,
  useEffect,
  memo,
} from "react";

import { createSimpleAction, WORKER_TERMINATE } from "../workers/common";

interface ModuleWorkerState {
  worker?: Worker;
  setWorker: (val: Worker) => void
}

const moduleWorkerState: ModuleWorkerState = {
  worker: undefined,
  setWorker: () => null
};

export const ModuleWorkerContext = createContext<ModuleWorkerState>(moduleWorkerState);

export const ModuleWorkerContextContainer = memo<PropsWithChildren>(({ children }) => {
  const [worker, setWorkerRef] = useState<Worker>();

  const setWorker = useCallback((worker: Worker) => {
    setWorkerRef(worker);
  }, []);

  const contextValue = useMemo<ModuleWorkerState>(() => ({
    worker,
    setWorker
  }), [worker, setWorker]);

  useEffect(() => {
    return () => {
      if (worker){
        worker.postMessage(createSimpleAction(WORKER_TERMINATE));
      }
    };
  }, [worker]);

  return (
    <ModuleWorkerContext.Provider value={contextValue}>
      {children}
    </ModuleWorkerContext.Provider>
  );
});

ModuleWorkerContextContainer.displayName = "ModuleWorkerContextContainer";
