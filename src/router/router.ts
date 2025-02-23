import { Block } from "../shared/components/block";
import { AppRoot, RouteInterface } from "../shared/models/models";
import { Route } from "./route";

export class Router {
  private static __instance: Router | null;
  routes: RouteInterface[] = [];
  history = window.history;
  private _currentRoute: RouteInterface | null = null;
  private _rootQuery: string = "";
  constructor(rootQuery: string = AppRoot) {
    if (Router.__instance) {
      return Router.__instance;
    }
    // this.routes = [];
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      this._onRoute((event.target as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

  getRoute(pathname: string) {
    const route = this.routes.find((route) => route.match(pathname));
    if (!route) {
      console.log();
      return this.routes.find((route) => route.match("*"));
    }

    return route;
  }

  static getInstance() {
    if (!Router.__instance) {
      Router.__instance = new Router();
    }
    return Router.__instance;
  }
}
