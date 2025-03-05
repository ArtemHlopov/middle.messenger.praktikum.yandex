import { API } from "../shared/models/api";
import { ChatCreate, ChatInfo } from "../shared/models/chat.models";
import { HTTPTransport } from "../shared/utils/httpClient";

const chatApi = new HTTPTransport();

const options = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    ["Content-Type"]: "application/json; charset=utf-8",
  },
};

export default class ChatAPI {
  async getChatList(): Promise<ChatInfo[]> {
    return chatApi.get(API.chatList, { ...options });
  }

  async createChat(data: ChatCreate): Promise<ChatCreate> {
    return chatApi.post(API.createChat, { ...options, data });
  }
}
