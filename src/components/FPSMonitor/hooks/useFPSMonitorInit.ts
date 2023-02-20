import { useContext, useEffect } from "react";

import { ModuleWorkerContext } from "context";

import { createSimpleAction } from "../../../workers/common";
import { FPS_MODULE_SET_CONTEXT, FPS_MODULE_START } from "../../../workers/module-worker/actions";
import { postCanvasTransferControl } from "../../CanvasContainer/helpers";

export const useFPSMonitorInit = (canvasRef: HTMLCanvasElement | null): void => {
  const { worker } = useContext(ModuleWorkerContext);

  useEffect(() => {
    if (worker && canvasRef){
      postCanvasTransferControl(
        canvasRef,
        FPS_MODULE_SET_CONTEXT,
        worker
      );
      worker.postMessage(
        createSimpleAction(
          FPS_MODULE_START
        )
      );
    }
  }, [worker, canvasRef]);
};
