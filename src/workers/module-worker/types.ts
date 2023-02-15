import {
  type UpdateAction as FPSUpdateAction,
  type PostAction as FPSPostAction
} from "./modules/fps-module";
import {
  type UpdateAction as TwinsManagerUpdateAction,
  type PostAction as TwinsManagerPostAction,
} from "./modules/twins-module";

export type PostAction =
  | TwinsManagerPostAction
  | FPSPostAction;

export type UpdateAction =
  | TwinsManagerUpdateAction
  | FPSUpdateAction
  | SimpleAction;
