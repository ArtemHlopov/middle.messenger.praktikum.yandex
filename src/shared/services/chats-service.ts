import ChatAPI from "../../api/api-chats";
import {
  ChatCreate,
  ChatRemoveResponseObj,
  ChatUsersAddRemoveObj,
} from "../models/chat.models";
import wsChat from "../../store/socket";

const chatApi = new ChatAPI();

export const getChatList = async (filter?: string): Promise<void> => {
  chatApi
    .getChatList(filter)
    .then((data) => {
      window.store.set({ chats: data });
      return data;
    })
    .catch(console.log);
};

export const createChat = async (data: ChatCreate): Promise<void> => {
  chatApi
    .createChat(data)
    .then(async () => {
      await getChatList();
    })
    .catch(console.log);
};

export const getChatToken = async (id: string | number): Promise<void> => {
  chatApi
    .getChatToken(id)
    .then((data) => {
      window.store.set({ tokenChat: data.token });
      wsChat.createWebSocket();
    })
    .catch(console.log);
};

export const addUserToChat = async (
  userData: ChatUsersAddRemoveObj
): Promise<string> => {
  return chatApi.addUserToChat(userData);
};

export const removeUserFromChat = async (
  userData: ChatUsersAddRemoveObj
): Promise<string> => {
  return chatApi.removeUserFromChat(userData);
};

export const removeChat = async (
  id: number
): Promise<ChatRemoveResponseObj> => {
  return chatApi.removeChat(id);
};
