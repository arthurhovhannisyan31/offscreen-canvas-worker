/*
* set start pointer to track position of first entry in 1000 ms range
* set end pointer to track position for data insertion
* */
let pointerStart = 0;
let pointerEnd = 0;

/*
* Time complexity: O(n), Space complexity: O(1)
* */
export const updateFpsSAB = (fpsI32Arr: Int32Array, animationFrameId:{ id: number }) :void => {
  /*
  * mutate id prop of animationFrameId object to cancel animation loop on component unmount
  * */
  animationFrameId.id = requestAnimationFrame(() => {
    /*
    * if by any reason we have too much of records and overflow array we reset pointers and start over
    * */
    if (pointerEnd + 1 > fpsI32Arr.length-1) {
      pointerStart= 0;
      pointerEnd = 0;
      updateFpsSAB(fpsI32Arr, animationFrameId);
    }
    /*
    * performance.now returns float value, need to floor to it store as i32
    * */
    const cur =  Math.floor(performance.now());

    if (pointerEnd !== 0) {
      /*
      * lookup for first element in 1000 ms range from current timestamp
      * */
      for (let i = 0; i < pointerEnd; i++) {
        if (fpsI32Arr[i] >= cur - 1000){
          pointerStart = i;
          break;
        }
      }
    }

    /*
    * write current timestamp to end pointer next section
    * */
    fpsI32Arr[pointerEnd++]= cur;
    if (pointerStart > 0){
      fpsI32Arr.copyWithin(0, pointerStart, pointerEnd);

      fillWithZeros(fpsI32Arr, pointerEnd-pointerStart, pointerEnd);

      pointerEnd = pointerEnd - pointerStart ;
    }

    updateFpsSAB(fpsI32Arr, animationFrameId);
  });
};

const fillWithZeros = (arr: Int32Array, start: number, end: number): void => {
  for (let i = start; i < end; i++) {
    arr[i] = 0;
  }
};
