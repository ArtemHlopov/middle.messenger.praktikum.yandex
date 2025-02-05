import { Block } from "../block";
import "./chat-list-item.scss";

import { default as ChatItem } from "./chat-list-item.hbs?raw";
import { AvatarComponent } from "../avatar/avatar";

export class ChatListItemComponent extends Block {
  constructor(
    chatId: string | number,
    name: string,
    dialog: string,
    date: string,
    unreadCount: number | null,
    custClass?: string
  ) {
    super("li", {
      avatar: new AvatarComponent("div", {
        additionalClass: "avatar-small",
      }),
      chatId: chatId,
      name: name,
      dialog: dialog,
      date: date,
      ...(custClass ? { customClass: custClass } : {}),
      ...(unreadCount ? { unreadCount: unreadCount } : {}),
    });
  }

  render(): DocumentFragment {
    return this.compile(ChatItem);
  }
}
