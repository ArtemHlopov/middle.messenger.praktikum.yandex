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
    template = Handlebars.compile(pagesList["404"]);
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

document.addEventListener("DOMContentLoaded", () => {
  const initialPage = window.location.pathname.slice(1) || "login";
  renderPage(initialPage);
});

document.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const link = target.getAttribute("page-link");
  if (link) {
    window.history.pushState({}, "", `/${link}`);
    renderPage(link);
  }
});

window.addEventListener("popstate", () => {
  const currentPage = window.location.pathname.slice(1) || "login";
  renderPage(currentPage);
});
