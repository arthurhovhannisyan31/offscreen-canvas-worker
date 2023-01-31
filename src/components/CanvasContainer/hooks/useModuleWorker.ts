import { useEffect, useRef, type MutableRefObject } from "react";

import { isSafari } from "../../../helpers";
import {
  createAction,
  createSimpleAction,
  MAIN_SET_CONTEXT,
  MODULE_WORKER_START,
  MODULE_WORKER_STOP,
  SATELLITE_SET_CONTEXT,
} from "../../../workers/common";
import { getMainModuleWorker } from "../../../workers/module-worker";

export interface UseModuleWorker {
  refs:  MutableRefObject<HTMLCanvasElement | null>[]
}

const postCanvasTransferControl = (
  canvas: HTMLCanvasElement,
  action: string,
  worker: Worker
): void => {
  const canvasControl = canvas.transferControlToOffscreen();
  worker.postMessage(
    createAction(action, { data: canvasControl }),
    [canvasControl]
  );
};

export const useModuleWorker = ():UseModuleWorker => {
  const moduleWorker = useRef<Worker | null>(null);
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!moduleWorker.current){
      moduleWorker.current = getMainModuleWorker();

      if (isSafari(navigator)){
        return;
      }

      if (canvas1Ref.current){
        postCanvasTransferControl(
          canvas1Ref.current,
          MAIN_SET_CONTEXT,
          moduleWorker.current
        );
      }

      if (canvas2Ref.current){
        postCanvasTransferControl(
          canvas2Ref.current,
          SATELLITE_SET_CONTEXT,
          moduleWorker.current
        );
      }
    }

    if (canvas1Ref.current && canvas2Ref.current && moduleWorker.current){
      moduleWorker.current?.postMessage(
        createSimpleAction(MODULE_WORKER_START)
      );
    }

    return () => {
      if (moduleWorker.current){
        moduleWorker.current?.postMessage(
          createSimpleAction(MODULE_WORKER_STOP)
        );
      }
    };
  }, []);

  return {
    refs: [canvas1Ref, canvas2Ref]
  };
};
