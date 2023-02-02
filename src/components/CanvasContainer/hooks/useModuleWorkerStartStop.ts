import { useContext, useEffect } from "react";

import { ModuleWorkerContext } from "../../../context";
import { isSafari } from "../../../helpers";
import { createSimpleAction, MAIN_SET_CONTEXT, SATELLITE_SET_CONTEXT } from "../../../workers/common";
import { MODULE_WORKER_START, MODULE_WORKER_STOP } from "../../../workers/module-worker/actions";
import { postCanvasTransferControl } from "../helpers";

export const useModuleWorkerStartStop = (
  canvas1Ref: HTMLCanvasElement | null,
  canvas2Ref: HTMLCanvasElement | null
):void => {
  const { worker: moduleWorker } = useContext(ModuleWorkerContext);

  useEffect(() => {
    if (isSafari(navigator)){
      return;
    }

    if (moduleWorker){
      if (canvas1Ref){
        postCanvasTransferControl(
          canvas1Ref,
          MAIN_SET_CONTEXT,
          moduleWorker
        );
      }

      if (canvas2Ref){
        postCanvasTransferControl(
          canvas2Ref,
          SATELLITE_SET_CONTEXT,
          moduleWorker
        );
      }
    }

    if (canvas1Ref && canvas2Ref && moduleWorker){
      moduleWorker.postMessage(
        createSimpleAction(MODULE_WORKER_START)
      );
    }

    return () => {
      if (moduleWorker){
        moduleWorker.postMessage(
          createSimpleAction(MODULE_WORKER_STOP)
        );
      }
    };

  }, [canvas1Ref, canvas2Ref, moduleWorker]);
};
