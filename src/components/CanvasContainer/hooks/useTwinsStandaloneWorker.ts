import { type MutableRefObject, useEffect, useRef } from "react";

import { getTwinsWorker } from "workers/standalone-workers/";

import type TwinsCanvasManager from "workers/standalone-workers/twins-standalone-worker/managers/twins-canvas-manager";

export interface UseStandaloneWorkers {
  refs:  MutableRefObject<HTMLCanvasElement | null>[]
}

export const useTwinsStandaloneWorkers = (): UseStandaloneWorkers => {
  const canvasWorker = useRef<TwinsCanvasManager | null>(null);
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasWorker.current && canvas1Ref.current && canvas2Ref.current) {
      canvasWorker.current = getTwinsWorker(
        canvas1Ref.current,
        [canvas2Ref.current]
      );
    }

    if (canvasWorker.current && canvas1Ref.current && canvas2Ref.current){
      canvasWorker.current.start();
    }

    return () => {
      if (canvasWorker.current){
        canvasWorker.current.stop();
      }
    };
  }, []);

  return {
    refs: [canvas1Ref, canvas2Ref]
  };
};
