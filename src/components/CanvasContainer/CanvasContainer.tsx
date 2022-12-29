import { memo, useEffect, useRef,  } from "react";

import type CanvasManager from "../../workers/standalone-workers/managers/canvas-manager";

import { getMainWorker } from "../../workers/standalone-workers";
import { getMainModuleWorker } from "../../workers/worker-modules";

export const CanvasContainer = memo(() => {
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas3Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas4Ref = useRef<HTMLCanvasElement | null>(null);
  const canvasWorker = useRef<CanvasManager | null>(null);
  const moduleWorker = useRef<Worker | null>(null);

  useEffect(() => {
    if (!moduleWorker.current){
      moduleWorker.current = getMainModuleWorker();
    }

    if (!canvasWorker.current
      && canvas1Ref.current
      && canvas2Ref.current
      && canvas3Ref.current
      && canvas4Ref.current
    ) {
      canvasWorker.current = getMainWorker(
        canvas1Ref.current,
        [
          canvas2Ref.current,
          canvas3Ref.current,
          canvas4Ref.current
        ]

      );
    }
  }, []);

  return(
      <div>
        <canvas ref={canvas1Ref} />
        <canvas ref={canvas2Ref} />
        <canvas ref={canvas3Ref} />
        <canvas ref={canvas4Ref} />
      </div>
  );
});

CanvasContainer.displayName = "CanvasContainer";

export default CanvasContainer;
