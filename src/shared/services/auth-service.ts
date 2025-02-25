import AuthAPI from "../../api/api-auth";
import { Router } from "../../router/router";
import { UserInfo, UserLogin } from "../models/auth.models";
import { Indexed, RoutesLinks } from "../models/models";

const authApi = new AuthAPI();

export const AuthService = {
  login: async (loginForm: UserLogin): Promise<void> => {
    console.log(loginForm);
    try {
      const xhr = await authApi.login(loginForm);
      console.log(xhr);
      if (xhr.ok) {
        await userInfo();
        Router.getInstance().go(RoutesLinks.chats);
      } else if (xhr.status === 400 && xhr.data) {
        const errData = JSON.parse(xhr.data);

        if (errData?.reason === "User already in system") {
          await userInfo();
          Router.getInstance().go(RoutesLinks.chats);
        }
      } else if (xhr.status >= 500) {
        Router.getInstance().go(RoutesLinks.serverError);
      }
    } catch (responsError: unknown) {
      if ((responsError as Indexed)?.reason === "User already in system") {
        Router.getInstance().go(RoutesLinks.chats);
      }
      console.error(responsError);
    } finally {
      Router.getInstance().go(RoutesLinks.chats);
    }
  },
  userInfo: async (): Promise<UserInfo | null> => {
    try {
      const xhr = await authApi.userInfo();
      if (xhr.ok) {
        const data = xhr.json<UserInfo>();

        return data;
      }
      return null;
    } catch (responsError: unknown) {
      console.error(responsError);
      return null;
    } finally {
    }
  },
};
