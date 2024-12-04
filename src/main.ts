import "./style.scss";
import Handlebars from "handlebars";
import { pagesList } from "./pages";
import * as Partials from "./shared/components";
import { TemplatesData } from "./shared/models/models";

registerPartial(Partials);

function renderPage(page: string) {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  let template;
  if (!pagesList[page]) {
    template = Handlebars.compile(pagesList["505"]);
  } else {
    template = Handlebars.compile(pagesList[page]);
  }

  app.innerHTML = template({});
}

function registerPartial(partials: TemplatesData): void {
  Object.keys(partials).forEach((key) =>
    Handlebars.registerPartial(key, partials[key])
  );
}

function handleNavigation() {
  const route = window.location.hash.slice(1);
  if (window.location.pathname.length > 1 && !window.location.hash) {
    renderPage("404");
  } else if (window.location.pathname.length > 1) {
    window.location.pathname = "/";
    renderPage(route);
  } else {
    renderPage(route || "login");
  }
}

window.addEventListener("load", handleNavigation);
window.addEventListener("hashchange", handleNavigation);
