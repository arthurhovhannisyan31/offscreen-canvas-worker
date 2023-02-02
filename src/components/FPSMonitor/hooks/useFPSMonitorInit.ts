import { useContext, useEffect } from "react";

import { ModuleWorkerContext } from "context";

import { FPS_MODULE_SET_CONTEXT } from "../../../workers/module-worker/actions";
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
    }
  }, [worker, canvasRef]);
};
