import { useRef, type MutableRefObject } from "react";

import { useModuleWorkerInit } from "./useModuleWorkerInit";
import { useModuleWorkerStartStop } from "./useModuleWorkerStartStop";

export interface UseModuleWorker {
  refs:  MutableRefObject<HTMLCanvasElement | null>[]
}

export const useModuleWorker = ():UseModuleWorker => {
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  useModuleWorkerInit();
  useModuleWorkerStartStop(canvas1Ref.current, canvas2Ref.current);

  return {
    refs: [canvas1Ref, canvas2Ref]
  };
};
