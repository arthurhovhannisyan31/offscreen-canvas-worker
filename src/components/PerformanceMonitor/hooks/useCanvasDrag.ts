import { useCallback, type PointerEvent, useEffect, type RefObject } from "react";

import { type PointerPosition } from "../types";

interface UseCanvasDragProps {
  canvasRef: RefObject<HTMLCanvasElement | null>,
  isCaptured: boolean,
  setIsCaptured: (val: boolean) => void,
  setPosition: (cb: (val: PointerPosition) => PointerPosition) => void
}

interface UseCanvasDragResult {
  onPointerDown: (event: PointerEvent<HTMLCanvasElement>) => void,
  onPointerMove: (event: PointerEvent<HTMLCanvasElement>) => void,
  onPointerUp: (event: PointerEvent<HTMLCanvasElement>) => void
}

export const useCanvasDrag = ({
  canvasRef,
  isCaptured,
  setIsCaptured,
  setPosition
}:UseCanvasDragProps): UseCanvasDragResult => {
  const onPointerDown = useCallback(  (event: PointerEvent<HTMLCanvasElement>) => {
    if (canvasRef.current){
      if (canvasRef.current.contains(event.target as Node)) {
        setIsCaptured(true);
        if (!document.pointerLockElement){
          canvasRef.current.requestPointerLock();
          // setPointerCapture as an alternative
        }
      }
    }
  },[canvasRef, setIsCaptured]);

  // TODO Update position on resize
  const onPointerMove = useCallback((event: PointerEvent<HTMLCanvasElement>) => {
    if (isCaptured){
      const clientWidth = window.document.body.clientWidth;
      const clientHeight = window.document.body.clientHeight;
      const canvasTop = canvasRef.current?.offsetTop ?? 0;
      const canvasLeft = canvasRef.current?.offsetLeft ?? 0;
      const canvasWidth = canvasRef.current?.clientWidth ?? 0;
      const canvasHeight = canvasRef.current?.clientHeight ?? 0;

      setPosition(({ x, y }) => {
        let nextX = x + event.movementX;
        let nextY = y + event.movementY;

        if (canvasLeft + (canvasWidth/2)  > clientWidth){
          nextX = -(canvasWidth / 2);
        } else if (canvasLeft + (canvasWidth / 2) < 0){
          nextX = clientWidth - (canvasWidth / 2);
        }
        if (canvasTop + (canvasHeight / 2) > clientHeight){
          nextY = -(canvasHeight / 2);
        } else if (canvasTop + (canvasHeight / 2) < 0){
          nextY = clientHeight - (canvasHeight / 2);
        }

        return {
          x: nextX,
          y: nextY,
        };
      });
    }
  },[canvasRef, isCaptured, setPosition]);

  const onPointerUp = useCallback(() => {
    setIsCaptured(false);
    if (canvasRef.current){
      document.exitPointerLock();
    }
  },[canvasRef, setIsCaptured]);

  const handlePointerLockChange = useCallback(() => {
    if (document.pointerLockElement !== canvasRef.current && isCaptured){
      onPointerUp();
    }
  }, [canvasRef, isCaptured, onPointerUp]);

  useEffect(() => {
    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener("pointerlockchange", handlePointerLockChange);
    };
  }, [handlePointerLockChange]);

  useEffect(() => {
    return () => {
      document.exitPointerLock();
    };
  }, []);

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp
  };
};
