import UserAPI from "../../api/user-api";
import {
  UserChangePasswordObj,
  UserDataForChange,
  UserInfo,
  UserLoginResponseObj,
} from "../models/auth.models";

export const changeUserData = async (
  userInfo: UserDataForChange
): Promise<UserInfo | { reason: string }> => {
  return await UserAPI.changeUserData(userInfo);
};

export const changeUserPassword = async (
  data: UserChangePasswordObj
): Promise<UserLoginResponseObj> => {
  return await UserAPI.changeUserPassword(data);
};

export const changeUserAvatar = async (data: File): Promise<void> => {
  await UserAPI.changeUserAvatar(data)
    .then((user) => {
      window.store.set({ user });
    })
    .catch(console.log);
};
