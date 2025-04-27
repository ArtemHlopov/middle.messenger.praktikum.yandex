import { API } from "../shared/models/api";
import {
  ChatCreate,
  ChatInfo,
  ChatRemoveResponseObj,
  ChatTokenRequest,
  ChatUsersAddRemoveObj,
} from "../shared/models/chat.models";
import HTTPTransport from "../shared/utils/httpClient";

const options = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    ["Content-Type"]: "application/json; charset=utf-8",
  },
};
class ChatAPI {
  async getChatList(filter?: string): Promise<ChatInfo[]> {
    return HTTPTransport.get(API.chatList, {
      ...options,
      data: filter ? { title: filter } : undefined,
    });
  }

  async createChat(data: ChatCreate): Promise<ChatCreate> {
    return HTTPTransport.post(API.createChat, { ...options, data });
  }

  async getChatToken(id: string | number): Promise<ChatTokenRequest> {
    return HTTPTransport.post(API.getChatToken + id);
  }

  async addUserToChat(data: ChatUsersAddRemoveObj): Promise<string> {
    return HTTPTransport.put(API.addUserToChat, { ...options, data: data });
  }

  async removeUserFromChat(data: ChatUsersAddRemoveObj): Promise<string> {
    return HTTPTransport.delete(API.removeUserFromChat, {
      ...options,
      data: data,
    });
  }

  async removeChat(id: number): Promise<ChatRemoveResponseObj> {
    return HTTPTransport.delete(API.removeChat, {
      ...options,
      data: { chatId: id },
    });
  }
}

export default new ChatAPI();
