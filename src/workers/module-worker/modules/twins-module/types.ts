import { type PostAction as MainCanvasModulePostAction } from "./main-canvas-module";
import { type PostAction as SatelliteCanvasModulePostAction } from "./satellite-canvas-module";
import { type CanvasAction } from "../../../types";

export type PostAction =
  | MainCanvasModulePostAction
  | SatelliteCanvasModulePostAction;

export type UpdateAction = CanvasAction | PostAction;
