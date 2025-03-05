import AuthAPI from "../../api/api-auth";
import { Route } from "../../router/route";
import { Router } from "../../router/router";
import { UserInfo, UserLogin, UserRegistration } from "../models/auth.models";
import { Indexed, RoutesLinks } from "../models/models";
import * as ChatsService from "./chats-service";

const authApi = new AuthAPI();

export const login = async (loginForm: UserLogin): Promise<void> => {
  await authApi
    .login(loginForm)
    .then(async (data) => {
      console.log(data);
      if (
        data === "OK" ||
        (data.reason && data.reason === "User already in system")
      ) {
        await userInfo();
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

export const register = async (
  registerForm: UserRegistration
): Promise<void> => {
  console.log(registerForm);
  await authApi
    .registration(registerForm)
    .then(async (data) => {
      const user = await userInfo();
      console.log("TYT", user);
      Router.getInstance().go(RoutesLinks.chats);
    })
    .catch(console.log);
};

export const userInfo = async () => {
  await authApi
    .userInfo()
    .then(async (user) => {
      if (typeof user === "object" && user !== null) {
        console.log("SETAEM", user);
        window.store.set({ user });
        console.log(window.store.getState());
      }
      await ChatsService.getChatList();
      Router.getInstance().go(RoutesLinks.chats);
    })
    .catch(console.error);
};

export const logout = async () => {
  await authApi.logout().then((data) => {
    console.log(data);
    Router.getInstance().go(RoutesLinks.login);
  });
};
