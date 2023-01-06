import { type MutableRefObject, useEffect, useRef } from "react";

import type CanvasManager from "../../../workers/standalone-workers/managers/canvas-manager";

import { getMainWorker } from "../../../workers/standalone-workers";

export interface UseStandaloneWorkers {
  refs:  MutableRefObject<HTMLCanvasElement | null>[]
}

export const useStandaloneWorkers = (): UseStandaloneWorkers => {
  const canvasWorker = useRef<CanvasManager | null>(null);
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasWorker.current && canvas1Ref.current && canvas2Ref.current) {
      canvasWorker.current = getMainWorker(
        canvas1Ref.current,
        [canvas2Ref.current]
      );
    }
  }, []);

  return {
    refs: [canvas1Ref, canvas2Ref]
  };
};
