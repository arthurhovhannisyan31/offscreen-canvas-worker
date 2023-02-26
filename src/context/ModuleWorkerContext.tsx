import {
  useState,
  createContext,
  useCallback,
  useMemo,
  type PropsWithChildren,
  type FC
} from "react";

interface ModuleWorkerState {
  worker?: Worker;
  setWorker: (val: Worker) => void
}

const moduleWorkerState: ModuleWorkerState = {
  worker: undefined,
  setWorker: () => null
};

export const ModuleWorkerContext = createContext<ModuleWorkerState>(moduleWorkerState);

export const ModuleWorkerContextContainer: FC<PropsWithChildren> = ({ children }) => {
  const [workerRef, setWorkerRef] = useState<Worker>();

  const setWorker = useCallback((worker: Worker) => {
    setWorkerRef(worker);
  }, []);

  const contextValue = useMemo<ModuleWorkerState>(() => ({
    worker: workerRef,
    setWorker
  }), [workerRef, setWorker]);

  return (
    <ModuleWorkerContext.Provider value={contextValue}>
      {children}
    </ModuleWorkerContext.Provider>
  );
};
