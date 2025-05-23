import { Block } from "../components/block";

export type TemplatesData = Record<PagesNames, typeof Block>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CallBack = (...args: any[]) => void;

export interface BlockProps {
  [key: string]: unknown;
  events?: {
    [key: string]: CallBack;
  };
  attr?: {
    [key: string]: string;
  };
}

export interface Children {
  [key: string]: Block | Block[];
}

export interface Chat {
  id: number;
  name: string;
  date: string;
  avatar: string;
  dialog: string;
}

export interface User {
  id: number;
  email: string;
  login: string;
  name: string;
  secondName: string;
  nickName: string;
  phone: string;
  avatar: string;
}

export interface ValidationError {
  errorMsg: string;
}

export interface RouteInterface {
  navigate(pathname: string): void;
  render(): void;
  match(pathname: string): boolean;
  leave(): void;
}

export interface RouteQuery {
  rootQuery: string;
}

export const AppRoot = "#app";

export enum PagesNames {
  login = "login",
  chats = "chats",
  registration = "registration",
  clientError = "clientError",
  serverError = "serverError",
  profile = "profile",
  changeProfile = "changeProfile",
  changePassword = "changePassword",
}

export const RoutesLinks: Record<PagesNames, string> = {
  [PagesNames.login]: "/",
  [PagesNames.registration]: "/sign-up",
  [PagesNames.chats]: "/messenger",
  [PagesNames.profile]: "/profile",
  [PagesNames.changeProfile]: "/settings",
  [PagesNames.changePassword]: "/change-password",
  [PagesNames.clientError]: "*",
  [PagesNames.serverError]: "/server-error",
};

export interface RequestResult {
  ok: boolean;
  status: number;
  statusText: string;
  data: string;
  json: <T>() => T | null;
  headers: string;
}

export type Indexed<T = unknown> = {
  [key in string | symbol]: T;
};

export type ErrorRequestObj = { reason: string };
