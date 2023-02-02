import TwinsCanvasManager from "./managers/twins-canvas-manager";
import SatelliteCanvasWorker from "./workers/satellite-canvas-worker?worker" assert {type: "module"};
import { SATELLITE_SET_CONTEXT } from "../../common";

export const getTwinsWorker = (
  canvas: HTMLCanvasElement,
  satelliteCanvases: HTMLCanvasElement[],
):TwinsCanvasManager => {
  const manager = new TwinsCanvasManager(canvas);

  manager.addObserver(
    new SatelliteCanvasWorker(),
    satelliteCanvases[0],
    SATELLITE_SET_CONTEXT
  );

  return manager;
};
