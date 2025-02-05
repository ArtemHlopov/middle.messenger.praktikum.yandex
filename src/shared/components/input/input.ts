import "./input.scss";
import { default as Input } from "./input.hbs?raw";
import { Block } from "../block";

export class InputComponent extends Block {
  render(): DocumentFragment {
    return this.compile(Input);
  }
}
