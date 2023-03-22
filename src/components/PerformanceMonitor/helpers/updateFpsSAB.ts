export const updateFpsSAB = (fpsI32Arr: Int32Array, animationFrameId:{ id: number }) :void => {
  /*
  * mutate id prop of animationFrameId object to cancel animation loop on component unmount
  * */
  animationFrameId.id = requestAnimationFrame(() => {
    fpsI32Arr[0] = 1;
    fpsI32Arr[1] = performance.now();
    fpsI32Arr[0] = 0;

    updateFpsSAB(fpsI32Arr, animationFrameId);
  });
};
