export const heavyTaskRun = (val = 1000000): void => {
  while (val > 0){
    for (let i = 0; i < val; i++) {
      const rand = Math.random();
      val -= rand;
    }
  }
};
