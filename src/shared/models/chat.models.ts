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

export interface ChatTokenRequest {
  token: string;
}

export interface ChatMessageObj {
  content: string;
  id: number;
  time: string;
  type: string;
  user_id: number;
}

export interface ChatMessageExtendedObj extends ChatMessageObj {
  isMine: boolean;
}

export interface ChatUsersAddRemoveObj extends Indexed {
  users: number[];
  chatId: number;
}

export interface ChatRemoveResponseObj extends Indexed {
  result: {
    id: number;
    title: string;
    avatar: string | null;
    created_by: number;
  };
  userId: number;
}
