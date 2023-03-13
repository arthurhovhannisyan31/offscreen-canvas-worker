import { useContext, useEffect } from "react";

import { ModuleWorkerContext } from "../../../context";
import { isSafari } from "../../../helpers";
import { createSimpleAction, MAIN_SET_CONTEXT, SATELLITE_SET_CONTEXT } from "../../../workers/common";
import { TWINS_MODULE_START } from "../../../workers/module-worker/actions";
import { postCanvasTransferControl } from "../helpers";

export const useTwinsWorkerInit = (
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
        createSimpleAction(TWINS_MODULE_START)
      );
    }
  }, [canvas1Ref, canvas2Ref, moduleWorker]);
};
