import { API } from "../shared/models/api";
import { UserLogin, UserRegistration } from "../shared/models/auth.models";
import { RequestResult } from "../shared/models/models";
import { HTTPTransport } from "../shared/utils/httpClient";

const authApi = new HTTPTransport();

const options = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    ["Content-Type"]: "application/json; charset=utf-8",
  },
};

export default class AuthAPI {
  async login(data: UserLogin): Promise<RequestResult> {
    return authApi.post(API.login, { ...options, data });
  }
  async registration(data: UserRegistration): Promise<RequestResult> {
    return authApi.post(API.registration, { ...options, data });
  }
  async userInfo(): Promise<RequestResult> {
    return authApi.get(API.userInfo, options);
  }
  async logout(): Promise<RequestResult> {
    return authApi.post(API.logout, options);
  }
}
