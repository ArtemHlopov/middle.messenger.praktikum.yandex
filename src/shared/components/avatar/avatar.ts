import "./avatar.scss";
import { default as Avatar } from "./avatar.hbs?raw";
import { Block } from "../block";

export class AvatarComponent extends Block {
  render(): DocumentFragment {
    return this.compile(Avatar);
  }
}
