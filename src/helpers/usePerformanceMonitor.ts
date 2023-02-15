export const usePerformanceMonitor = () : void => {
  const sab = new SharedArrayBuffer(1024);
  const i32arr = new Int32Array(sab);

  console.log(sab);
  console.log(i32arr);

  const raf = (): void   => {
    requestAnimationFrame(() => {
      console.log(performance.now());
    });
    raf();
  };
  raf();
};
