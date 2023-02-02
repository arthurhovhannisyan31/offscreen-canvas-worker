import { useRef, type MutableRefObject } from "react";

import { useTwinsWorkerInit } from "./useTwinsWorkerInit";

export interface UseTwinsModuleWorker {
  refs:  MutableRefObject<HTMLCanvasElement | null>[]
}

export const useTwinsModuleWorker = ():UseTwinsModuleWorker => {
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  useTwinsWorkerInit(canvas1Ref.current, canvas2Ref.current);

  return {
    refs: [canvas1Ref, canvas2Ref]
  };
};
