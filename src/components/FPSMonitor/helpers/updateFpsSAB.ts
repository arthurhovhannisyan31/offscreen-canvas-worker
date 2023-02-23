/*
* set start pointer to track position of first entry in 1000 ms range
* set end pointer to track position for data insertion
* */
let pointerStart = 0;
let pointerEnd = 0;

export const updateFpsSAB = (fpsSAB: Int32Array, animationFrameId:{ id: number }) :void => {
  /*
  * mutate id prop of animationFrameId object to cancel animation loop on component unmount
  * */
  animationFrameId.id = requestAnimationFrame(() => {
    /*
    * if by any reason we have too much of records and overflow array we reset pointers and start over
    * */
    if (pointerEnd + 1 > fpsSAB.length-1) {
      pointerStart= 0;
      pointerEnd = 0;
      updateFpsSAB(fpsSAB, animationFrameId);
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
        if (fpsSAB[i] >= cur - 1000){
          pointerStart = i;
          break;
        }
      }
    }

    /*
    * write current timestamp to end pointer next section
    * */
    fpsSAB[pointerEnd++]= cur;
    if (pointerStart > 0){
      fpsSAB.copyWithin(0, pointerStart, pointerEnd);

      fillWithZeros(fpsSAB, pointerEnd-pointerStart, pointerEnd);

      pointerEnd = pointerEnd - pointerStart ;
    }

    updateFpsSAB(fpsSAB, animationFrameId);
  });
};

const fillWithZeros = (arr: Int32Array, start: number, end: number): void => {
  for (let i = start; i < end; i++) {
    arr[i] = 0;
  }
};
