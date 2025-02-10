import { Block } from "../components/block";

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

export type TemplatesData = Record<PagesNames, Block>;

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
