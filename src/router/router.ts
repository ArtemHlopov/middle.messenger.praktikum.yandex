import { Block } from "../shared/components/block";
import { AppRoot, RouteInterface, RoutesLinks } from "../shared/models/models";
import { Route } from "./route";

export class Router {
  private static instance: Router | null;
  routes: RouteInterface[] = [];
  history = window.history;
  private currentRoute: RouteInterface | null = null;
  private rootQuery: string = "";
  constructor(rootQuery: string = AppRoot) {
    if (Router.instance) {
      return Router.instance;
    }
    this.currentRoute = null;
    this.rootQuery = rootQuery;

    Router.instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this.rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this.onRoute((event.target as Window).location.pathname);
    };

    const pathname = window.location.pathname;

    const user = window.store.getState().user;
    const isAuthRoute =
      pathname === RoutesLinks.login || pathname === RoutesLinks.registration;
    if (!user?.id && !isAuthRoute) {
      this.go(RoutesLinks.login);
    } else if (user && isAuthRoute) {
      this.go(RoutesLinks.chats);
    } else {
      this.onRoute(pathname);
    }
  }

  onRoute(pathname: string) {
    const store = window.store?.getState();

    if (store && pathname === RoutesLinks.chats) {
      window.store.set({ pickedChat: null, tokenChat: "" });
    }

    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    const user = window.store.getState().user;
    const isAuthRoute =
      pathname === RoutesLinks.login || pathname === RoutesLinks.registration;

    if (!user?.id && !isAuthRoute) {
      this.history.pushState({}, "", RoutesLinks.login);
      this.onRoute(RoutesLinks.login);
      return;
    }

    this.history.pushState({}, "", pathname);
    this.onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string) {
    if (pathname === "/") {
      const user = window.store.getState().user;
      if (user) {
        return this.routes.find((route) => route.match(RoutesLinks.login));
      } else {
        return this.routes.find((route) => route.match(RoutesLinks.login));
      }
    }
    const route = this.routes.find((route) => route.match(pathname));
    if (!route) {
      return this.routes.find((route) => route.match(RoutesLinks.clientError));
    }

    return route;
  }

  static getInstance() {
    if (!Router.instance) {
      Router.instance = new Router();
    }
    return Router.instance;
  }

  //only for tests
  static _resetInstanceForTests() {
    Router.instance = null;
  }
}
