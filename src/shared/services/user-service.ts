import UserAPI from "../../api/user-api";
import { Router } from "../../router/router";
import {
  UserChangePasswordObj,
  UserDataForChange,
  UserInfo,
  UserSearchObj,
} from "../models/auth.models";
import { RoutesLinks } from "../models/models";

const userApi = new UserAPI();

export const changeUserData = async (
  userInfo: UserDataForChange
): Promise<void> => {
  await userApi
    .changeUserData(userInfo)
    .then(async (data) => {
      console.log(data);
      if (data && "id" in data) {
        window.store.set({ user: data });
        Router.getInstance().go(RoutesLinks.chats);
      }

      // if (data)
      //   try {
      //     const user = await userInfo();
      //     console.log("TYT", user);
      //     if (user) {
      //       console.log("TUT2", user);
      //       Router.getInstance().go(RoutesLinks.chats);
      //     }
      //   } catch (error) {}
    })
    .catch(console.log);
};

export const changeUserPassword = async (
  data: UserChangePasswordObj
): Promise<void> => {
  await userApi
    .changeUserPassword(data)
    .then(async (response) => {
      console.log("PASSWORD CHANGED", response);
      if (response === "OK") {
        Router.getInstance().go(RoutesLinks.chats);
      }
    })
    .catch(console.log);
};

export const searchUsersByLogin = async (
  data: UserSearchObj
): Promise<void> => {
  await userApi
    .searchUserByLogin(data)
    .then(async (searchUsers) => {
      console.log("USERSEARCH", searchUsers);
      window.store.set({ searchUsers });
    })
    .catch(console.log);
};

export const changeUserAvatar = async (data: File): Promise<void> => {
  await userApi
    .changeUserAvatar(data)
    .then((user) => {
      console.log("AVATAR CHANGED", user);
      window.store.set({ user });
    })
    .catch(console.log);
};
