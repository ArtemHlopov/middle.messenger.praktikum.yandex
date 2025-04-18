import UserAPI from "../../api/user-api";
import { Router } from "../../router/router";
import {
  UserChangePasswordObj,
  UserDataForChange,
  UserLoginResponseObj,
} from "../models/auth.models";
import { RoutesLinks } from "../models/models";

const userApi = new UserAPI();

export const changeUserData = async (
  userInfo: UserDataForChange
): Promise<void> => {
  await userApi
    .changeUserData(userInfo)
    .then(async (data) => {
      if (data && "id" in data) {
        window.store.set({ user: data });
        Router.getInstance().go(RoutesLinks.chats);
      }
    })
    .catch(console.log);
};

export const changeUserPassword = async (
  data: UserChangePasswordObj
): Promise<UserLoginResponseObj> => {
  return await userApi.changeUserPassword(data);
};

export const changeUserAvatar = async (data: File): Promise<void> => {
  await userApi
    .changeUserAvatar(data)
    .then((user) => {
      window.store.set({ user });
    })
    .catch(console.log);
};
