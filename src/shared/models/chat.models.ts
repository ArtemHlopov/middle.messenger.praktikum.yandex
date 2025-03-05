import { title } from "process";
import { Indexed } from "./models";

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  created_by: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}

export interface ChatCreate extends Indexed {
  title: string;
}

export interface ChateCreateResponseObj {
  id: number;
}
