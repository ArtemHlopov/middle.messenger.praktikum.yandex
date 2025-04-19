import UserAPI from "../../api/user-api";
import {
  UserChangePasswordObj,
  UserDataForChange,
  UserInfo,
  UserLoginResponseObj,
} from "../models/auth.models";

const userApi = new UserAPI();

export const changeUserData = async (
  userInfo: UserDataForChange
): Promise<UserInfo | { reason: string }> => {
  return await userApi.changeUserData(userInfo);
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
