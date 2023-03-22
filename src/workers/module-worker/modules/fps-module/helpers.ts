/*
* Since worker context is created later than main thread context we take
* the diff of contexts creation. (workerTimeOrigin > mainThreadTimeOrigin)
* Timestamp of worker is lower than main thread timestamp, to match them
* we need to adjust worker timestamp by context creation diff value.
* workerTimeStamp + diff = main thread timestamp
* */
export const getAdjustedPerformanceTimeStamp = (
  workerTimeStamp: number,
  workerTimeOrigin: number,
  mainThreadTimeOrigin: number
): number => {
  return workerTimeStamp + workerTimeOrigin - mainThreadTimeOrigin;
};
