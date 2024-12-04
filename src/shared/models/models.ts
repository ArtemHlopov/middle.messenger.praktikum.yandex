export type TemplatesData = Record<string, string>;

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
