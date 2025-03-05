import ChatAPI from "../../api/api-chats";
import { ChatCreate } from "../models/chat.models";

const chatApi = new ChatAPI();

export const getChatList = async (): Promise<void> => {
  chatApi
    .getChatList()
    .then((data) => {
      console.log(data);
      window.store.set({ chats: data });
      return data;
    })
    .catch(console.log);
};

export const createChat = async (data: ChatCreate) => {
  chatApi
    .createChat(data)
    .then(async (data) => {
      await getChatList();
    })
    .catch(console.log);
};
