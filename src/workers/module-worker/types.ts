import {
  type UpdateAction as FPSUpdateAction,
  type SendAction as FPSPostAction
} from "./modules/fps-module";
import {
  type UpdateAction as TwinsManagerUpdateAction,
  type SendAction as TwinsManagerPostAction,
} from "./modules/twins-module/types";

export type PostMessage = Message<any>;

export type SendAction =
  | TwinsManagerPostAction
  | FPSPostAction
  | SimpleAction;

export type UpdateAction =
  | TwinsManagerUpdateAction
  | FPSUpdateAction
  | SimpleAction;
