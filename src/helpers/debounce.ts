export const debounce = <T extends never[]>(
  cb: (...args: T) => void,
  ms = 500,
): ((...args: T) => void) => {
  let timeoutID: ReturnType<typeof setTimeout>;

  return (...args: T) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => cb(...args), ms);
  };
};
