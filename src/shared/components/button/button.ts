import { Block } from "../block";
import "./button.scss";
import { default as ButtonTemplate } from "./button.hbs?raw";

export class ButtonComponent extends Block {
  render(): DocumentFragment {
    return this.compile(ButtonTemplate);
  }
}
