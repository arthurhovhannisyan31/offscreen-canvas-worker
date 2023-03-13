export const throttle = <T extends any[]>(
  cb: (...args: T) => void,
  ms = 1000,
): (...args: T) => void => {
  let wait  = false;

  return (...args) => {
    if (wait) return;
    wait = true;
    cb(...args);
    setTimeout(() => {
      wait = false;
    }, ms);
  };
};
