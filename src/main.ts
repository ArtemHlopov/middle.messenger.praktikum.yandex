import "./style.scss";
import { RoutesLinks } from "./shared/models/models";
import { pagesList } from "./pages";
import { Router } from "./router/router";
import { Store } from "./store/store";
import { ChatWebSocket } from "./store/socket";
import * as AuthService from "./shared/services/auth-service";

declare global {
  interface Window {
    store: Store;
    socket: ChatWebSocket;
  }
}

window.store = new Store({
  user: null,
  chats: [],
  pickedChat: null,
  tokenChat: "",
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await AuthService.userInfo();
  } catch (error) {
    console.log("Auth failed", error);
  } finally {
    const router = new Router();
    router
      .use(RoutesLinks.login, pagesList.login)
      .use(RoutesLinks.registration, pagesList.registration)
      .use(RoutesLinks.chats, pagesList.chats)
      .use(RoutesLinks.profile, pagesList.profile)
      .use(RoutesLinks.changeProfile, pagesList.changeProfile)
      .use(RoutesLinks.changePassword, pagesList.changePassword)
      .use(RoutesLinks.serverError, pagesList.serverError)
      .use(RoutesLinks.clientError, pagesList.clientError)
      .start();
  }
});
