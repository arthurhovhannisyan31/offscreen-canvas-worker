import { memo, useEffect, useRef } from "react";

import type CanvasManager from "../../workers/managers/canvas-manager";

import { getMainWorker } from "../../workers/main";

export const CanvasContainer = memo(() => {
  const canvas1Ref = useRef<HTMLCanvasElement | null>(null);
  const canvas2Ref = useRef<HTMLCanvasElement | null>(null);
  const canvasWorker = useRef<CanvasManager | null>(null);

  useEffect(() => {
    if (!canvasWorker.current
      && canvas1Ref.current
      && canvas2Ref.current
    ) {
      canvasWorker.current = getMainWorker(
        canvas1Ref.current,
        canvas2Ref.current
      );
    }
  }, []);

  return(
      <div>
        <canvas ref={canvas1Ref} />
        <canvas ref={canvas2Ref} />
      </div>
  );
});

CanvasContainer.displayName = "CanvasContainer";
