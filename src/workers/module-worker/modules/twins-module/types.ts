import { type SendAction as MainCanvasModulePostAction } from "./main-canvas-module";
import { type SendAction as SatelliteCanvasModulePostAction } from "./satellite-canvas-module";
import { type CanvasAction } from "../../../types";

export type SendAction =
  | MainCanvasModulePostAction
  | SatelliteCanvasModulePostAction
  | SimpleAction;

export type UpdateAction = CanvasAction | SendAction;

export type SendMessage<T = any> = Message<T>;
