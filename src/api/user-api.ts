import { API } from "../shared/models/api";
import {
  UserChangePasswordObj,
  UserDataForChange,
  UserInfo,
  UserLoginResponseObj,
  UserSearchObj,
} from "../shared/models/auth.models";
import { HTTPTransport, RequestBody } from "../shared/utils/httpClient";

const userApi = new HTTPTransport();

const options = {
  mode: "cors",
  headers: {
    Accept: "application/json",
    ["Content-Type"]: "application/json; charset=utf-8",
  },
};

export default class UserAPI {
  async changeUserData(
    data: UserDataForChange
  ): Promise<UserInfo | { reason: string }> {
    return userApi.put(API.changeUserData, { ...options, data });
  }

  async changeUserAvatar(data: File) {
    const formData = new FormData();
    formData.append("avatar", data);
    console.log(data, formData);

    return userApi.put(API.changeUserAvatar, {
      data: formData as unknown as RequestBody,
    });
  }

  async changeUserPassword(
    data: UserChangePasswordObj
  ): Promise<UserLoginResponseObj> {
    return userApi.put(API.changeUserPasswor, { ...options, data });
  }

  async searchUserByLogin(data: UserSearchObj) {
    return userApi.post(API.searchUserByLogin, { ...options, data });
  }
}
