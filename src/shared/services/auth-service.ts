import AuthAPI from "../../api/api-auth";
import { Router } from "../../router/router";
import { UserInfo, UserLogin, UserRegistration } from "../models/auth.models";
import { RoutesLinks } from "../models/models";

export const login = async (loginForm: UserLogin): Promise<void> => {
  await AuthAPI.login(loginForm).then(async (data) => {
    if (
      data === "OK" ||
      (data.reason && data.reason === "User already in system")
    ) {
      await userInfo();
    } else {
      throw new Error(data.reason || "Login failed");
    }
  });
};

export const register = async (
  registerForm: UserRegistration
): Promise<void> => {
  await AuthAPI.registration(registerForm)
    .then(async () => {
      await userInfo();
      Router.getInstance().go(RoutesLinks.chats);
    })
    .catch(console.log);
};

export const userInfo = async () => {
  await AuthAPI.userInfo()
    .then(async (user) => {
      if (!user.reason) {
        window.store.set({ user: user as UserInfo });
        const path = window.location.pathname;
        if (path === RoutesLinks.login || path === RoutesLinks.registration) {
          Router.getInstance().go(RoutesLinks.chats);
        }
      }
    })
    .catch(console.error);
};

export const logout = async () => {
  await AuthAPI.logout().then(() => {
    Router.getInstance().go(RoutesLinks.login);
    window.store.set({ user: null });
  });
};
