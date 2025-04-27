import { API } from "../shared/models/api";
import {
  UserChangePasswordObj,
  UserDataForChange,
  UserInfo,
  UserLoginResponseObj,
  UserSearchObj,
} from "../shared/models/auth.models";
import HTTPTransport, { RequestBody } from "../shared/utils/httpClient";

const options = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    ["Content-Type"]: "application/json; charset=utf-8",
  },
};
class UserAPI {
  async changeUserData(
    data: UserDataForChange
  ): Promise<UserInfo | { reason: string }> {
    return HTTPTransport.put(API.changeUserData, { ...options, data });
  }

  async changeUserAvatar(data: File): Promise<UserInfo> {
    const formData = new FormData();
    formData.append("avatar", data);

    return HTTPTransport.put(API.changeUserAvatar, {
      data: formData as unknown as RequestBody,
    });
  }

  async changeUserPassword(
    data: UserChangePasswordObj
  ): Promise<UserLoginResponseObj> {
    return HTTPTransport.put(API.changeUserPasswor, { ...options, data });
  }

  async searchUserByLogin(data: UserSearchObj) {
    return HTTPTransport.post(API.searchUserByLogin, { ...options, data });
  }
}

export default new UserAPI();
