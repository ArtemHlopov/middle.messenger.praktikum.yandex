import { Block } from "../block";
import "./error-page.scss";
import { default as ErrorPage } from "./error-page.hbs?raw";
import { ButtonComponent } from "../button/button";
import { Router } from "../../../router/router";
import { RoutesLinks } from "../../models/models";

const button = new ButtonComponent("div", {
  link: "chats",
  text: "Back to chats",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.chats),
  },
});
export class ErrorComponent extends Block {
  constructor(customTitle: string, customText: string) {
    super("div", {
      title: customTitle,
      text: customText,
      button,
      attr: {
        class: "error-page-wrapper",
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(ErrorPage);
  }
}
