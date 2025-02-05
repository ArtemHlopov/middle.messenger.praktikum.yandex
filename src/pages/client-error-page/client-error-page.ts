import { Block } from "../../shared/components/block";
import { ErrorComponent } from "../../shared/components/error-page/error-page";
import { default as ClientErrorPage } from "./client-error-page.hbs?raw";
import "../server-error-page/server-error-page.scss";

const errorComponent = new ErrorComponent("404", "Page not found");
export class ClientErrorPageComponent extends Block {
  constructor() {
    super("div", {
      errorComponent,
      attr: {
        class: "client-error-page-wrapper",
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(ClientErrorPage);
  }
}
