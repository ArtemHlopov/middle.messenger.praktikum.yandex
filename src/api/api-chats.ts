import { API } from "../shared/models/api";
import {
  ChatCreate,
  ChatInfo,
  ChatRemoveResponseObj,
  ChatTokenRequest,
  ChatUsersAddRemoveObj,
} from "../shared/models/chat.models";
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
  async getChatList(filter?: string): Promise<ChatInfo[]> {
    return chatApi.get(API.chatList, {
      ...options,
      data: filter ? { title: filter } : undefined,
    });
  }

  async createChat(data: ChatCreate): Promise<ChatCreate> {
    return chatApi.post(API.createChat, { ...options, data });
  }

  async getChatToken(id: string | number): Promise<ChatTokenRequest> {
    return chatApi.post(API.getChatToken + id);
  }

  async addUserToChat(data: ChatUsersAddRemoveObj): Promise<string> {
    return chatApi.put(API.addUserToChat, { ...options, data: data });
  }

  async removeUserFromChat(data: ChatUsersAddRemoveObj): Promise<string> {
    return chatApi.delete(API.removeUserFromChat, { ...options, data: data });
  }

  async removeChat(id: number): Promise<ChatRemoveResponseObj> {
    return chatApi.delete(API.removeChat, {
      ...options,
      data: { chatId: id },
    });
  }
}
