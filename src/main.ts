import "./style.scss";
import { AppRoot, PagesNames, RoutesLinks } from "./shared/models/models";
import { pagesList } from "./pages";
import { render } from "./shared/utils/render";
import { Router } from "./router/router";
import { Store } from "./store/store";

declare global {
  interface Window {
    store: Store;
  }
}

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

router.go(RoutesLinks.login);

window.store = new Store({
  isLoading: false,
  signInError: "",
  signUpError: "",
  changeProfileError: "",
  user: {},
  searchUsers: [],
  pickedChat: {},
  tokenChat: "",
});
