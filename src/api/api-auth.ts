import { API } from "../shared/models/api";
import {
  UserInfo,
  UserLogin,
  UserLoginResponseObj,
  UserRegistration,
  UserRegistrationResponseObj,
} from "../shared/models/auth.models";
import { ErrorRequestObj } from "../shared/models/models";
import HTTPTransport from "../shared/utils/httpClient";

const options = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    ["Content-Type"]: "application/json; charset=utf-8",
  },
};

class AuthAPI {
  async login(data: UserLogin): Promise<UserLoginResponseObj> {
    return HTTPTransport.post(API.login, { ...options, data });
  }
  async registration(
    data: UserRegistration
  ): Promise<UserRegistrationResponseObj> {
    return HTTPTransport.post(API.registration, { ...options, data });
  }
  async userInfo(): Promise<UserInfo | ErrorRequestObj> {
    return HTTPTransport.get(API.userInfo, options);
  }
  async logout() {
    return HTTPTransport.post(API.logout, options);
  }
}

export default new AuthAPI();
