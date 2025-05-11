import { Router } from "./router";
import { Block } from "../shared/components/block";
import { RouteInterface, RoutesLinks } from "../shared/models/models";
import { Route } from "./route";

class MockComponent extends Block {}

describe("Router", () => {
  let router: Router;

  beforeEach(() => {
    const testStore = {
      getState: () => ({ user: { id: 1 } }),
      set: jest.fn(),
    };

    Object.defineProperty(window, "store", {
      value: testStore,
      writable: true,
    });

    Router._resetInstanceForTests();
    router = new Router("#app");
  });

  it("must be single", () => {
    const router1 = new Router();
    const router2 = new Router();
    expect(router1).toBe(router2);
  });

  it("must add route", () => {
    router.use("/test", MockComponent);
    expect(router.routes.length).toBe(1);
    expect(router.routes[0]).toBeInstanceOf(Route);
  });

  it("must call onRoute on start", () => {
    const spy = jest.spyOn(router, "onRoute");
    router.start();
    expect(spy).toHaveBeenCalledWith(window.location.pathname);
  });

  it("must redirect to login if user is not logged in", () => {
    history.pushState({}, "", "/unknown");
    router["routes"] = [];
    window.store.getState = jest.fn().mockReturnValue({ user: null });
    const goSpy = jest.spyOn(router, "go");
    router.start();
    expect(goSpy).toHaveBeenCalledWith(RoutesLinks.login);
  });

  it("must redirect to chats if user is logged in and route is auth", () => {
    window.store.getState = jest.fn().mockReturnValue({ user: { id: 1 } });
    const goSpy = jest.spyOn(router, "go");
    router.use(RoutesLinks.login, MockComponent);
    router.start();
    expect(goSpy).toHaveBeenCalledWith(RoutesLinks.chats);
  });

  it("must call leave on previous route when navigating", () => {
    const fakeRoute: RouteInterface = {
      match: jest.fn(() => false),
      leave: jest.fn(),
      render: jest.fn(),
      navigate: jest.fn(),
    };
    router["currentRoute"] = fakeRoute;
    router["routes"] = [
      {
        match: (path) => path === "/test",
        leave: jest.fn(),
        render: jest.fn(),
        navigate: jest.fn(),
      },
    ];
    router.onRoute("/test");
    expect(fakeRoute.leave).toHaveBeenCalled();
  });

  it("must change pathname and call onRoute on go", () => {
    const onRouteSpy = jest.spyOn(router, "onRoute");
    router.go("/profile");
    expect(window.location.pathname).toBe("/profile");
    expect(onRouteSpy).toHaveBeenCalledWith("/profile");
  });

  it("must navigate back ", () => {
    const backSpy = jest.spyOn(window.history, "back");
    router.back();
    expect(backSpy).toHaveBeenCalled();
  });

  it("must navigate forward", () => {
    const forwardSpy = jest.spyOn(window.history, "forward");
    router.forward();
    expect(forwardSpy).toHaveBeenCalled();
  });

  it("must return fallback route if path is unknown", () => {
    const fallback: RouteInterface = {
      match: (path: string) => path === RoutesLinks.clientError,
      leave: jest.fn(),
      render: jest.fn(),
      navigate: jest.fn(),
    };
    router["routes"] = [fallback];
    const route = router.getRoute("/unknown");
    expect(route).toBe(fallback);
  });
});
