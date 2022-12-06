import { memo, useRef } from "react";

export const CanvasContainer = memo(() => {
  const canvas1Ref = useRef(null);
  const canvas2Ref = useRef(null);

  return(
      <div>
        <canvas ref={canvas1Ref} />
        <canvas ref={canvas2Ref} />
      </div>
  )
})

CanvasContainer.displayName = "CanvasContainer"
