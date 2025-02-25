import "./style.scss";
import { AppRoot, PagesNames, RoutesLinks } from "./shared/models/models";
import { pagesList } from "./pages";
import { render } from "./shared/utils/render";
import { Router } from "./router/router";

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
// window.router = new Router(AppRoot);
// window.router
//   .use(RoutesLinks.login, pagesList.login)
//   .use(RoutesLinks.registration, pagesList.registration)
//   .use(RoutesLinks.chats, pagesList.chats)
//   .use(RoutesLinks.profile, pagesList.profile)
//   .use(RoutesLinks.changeProfile, pagesList.changeProfile)
//   .use(RoutesLinks.changePassword, pagesList.changePassword)
//   .use(RoutesLinks.serverError, pagesList.serverError)
//   .use(RoutesLinks.clientError, pagesList.clientError)
//   .start();

// window.router.go(RoutesLinks.login);

// function initApp(): void {
//   const currentPage = window.location.pathname.slice(1) || PagesNames.login;
//   if (currentPage in pagesList) {
//     render(AppRoot, new pagesList[currentPage as keyof typeof pagesList]());
//   } else {
//     render(AppRoot, new pagesList.clientError());
//   }
// }

// document.addEventListener("click", (e: Event) => {
//   const target = e.target as HTMLElement;
//   const link = target.getAttribute("page-link");
//   if (link && link in pagesList) {
//     render(AppRoot, new pagesList[link as keyof typeof pagesList]());
//   }
// });

// initApp();
