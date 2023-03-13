import { useRef, useEffect, useCallback } from "react";

export const useEvent = <T extends any[]>(
  handler: (...args: T) => void
): ((...args: T) => void) => {
  const handlerRef = useRef<((...args: T) => void) | null>(null);

  useEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args) => {
    const fn = handlerRef.current;

    return fn?.(...args);
  }, []);
};
