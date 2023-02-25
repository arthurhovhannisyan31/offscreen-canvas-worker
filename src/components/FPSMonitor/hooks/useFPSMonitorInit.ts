import { useContext, useEffect } from "react";

import { ModuleWorkerContext } from "context";
import { createAction, createSimpleAction } from "workers/common";
import { FPS_MODULE_SET_DATA, FPS_MODULE_START } from "workers/module-worker/actions";
import { type SetDataPayload } from "workers/module-worker/modules/fps-module/types";

import { updateFpsSAB } from "../helpers";

const animationFrameId: { id: number } = { id: 0 };
const fpsSAB = new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 1024);
const fpsMarksInt32Arr = new Int32Array(fpsSAB);

export const useFPSMonitorInit = (canvasRef: HTMLCanvasElement | null): void => {
  const { worker } = useContext(ModuleWorkerContext);

  updateFpsSAB(fpsMarksInt32Arr, animationFrameId);

  useEffect(() => {
    if (worker && canvasRef) {
      const canvasControl = canvasRef.transferControlToOffscreen();
      const setDataPayload: SetDataPayload = {
        canvas: canvasControl as never as HTMLCanvasElement,
        fpsSAB
      };

      worker.postMessage(
        createAction(FPS_MODULE_SET_DATA, setDataPayload),
        [canvasControl]
      );
      worker.postMessage(
        createSimpleAction(FPS_MODULE_START)
      );
    }

    return () => {
      cancelAnimationFrame(animationFrameId.id);
    };
  }, [worker, canvasRef]);
};
