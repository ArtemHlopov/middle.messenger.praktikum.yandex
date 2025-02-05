import "./style.scss";
import { PagesNames } from "./shared/models/models";
import { Block } from "./shared/components/block";
import { pagesList } from "./pages";

const root = "#app";

function initApp(): void {
  const currentPage = window.location.pathname.slice(1) || PagesNames.login;
  if (currentPage in pagesList) {
    render(root, pagesList[currentPage as keyof typeof pagesList]);
  } else {
    render(root, pagesList.clientError);
  }
}

document.addEventListener("click", (e: Event) => {
  const target = e.target as HTMLElement;
  const link = target.getAttribute("page-link");
  if (link && link in pagesList) {
    render(root, pagesList[link as keyof typeof pagesList]);
  }
});

function render(selector: string, block: Block): Element | null {
  const root = document.querySelector(selector);
  const content = block.getContent();

  if (content && root) {
    root.innerHTML = "";
    root.appendChild(content);
  }

  block.dispatchComponentDidMount();

  return root;
}

initApp();
