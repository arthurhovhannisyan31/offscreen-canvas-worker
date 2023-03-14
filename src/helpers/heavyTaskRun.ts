export const heavyTaskRun = (val = 1000): number => {
  let cur = 0;
  for (let i = 0; i < val; i++) {
    for (let j = i; j < val; j++) {
      const rand = Math.random();
      cur += rand;
    }
  }

  return cur;
};
