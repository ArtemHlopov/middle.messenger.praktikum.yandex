import "./server-error-page.scss";

import { default as ServerErrorPage } from "./server-error-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { ErrorComponent } from "../../shared/components/error-page/error-page";

const errorComponent = new ErrorComponent("505", "Page in work");
export class ServerErrorPageComponent extends Block {
  constructor() {
    super("div", {
      errorComponent,
      attr: {
        class: "client-error-page-wrapper",
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(ServerErrorPage);
  }
}
