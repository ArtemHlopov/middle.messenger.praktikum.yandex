import { Block } from "../block";
import "./chat-list-item.scss";
import * as ChatService from "../../services/chats-service";
import { default as ChatItem } from "./chat-list-item.hbs?raw";
import { AvatarComponent } from "../avatar/avatar";

export class ChatListItemComponent extends Block {
  constructor(
    chatId: string | number,
    name: string,
    dialog: string,
    date: string,
    unreadCount: number | null,
    avatar: string,
    custClass?: string
  ) {
    super("li", {
      avatar: new AvatarComponent("div", {
        additionalClass: "avatar-small",
        ...(avatar && { avatarLink: avatar }),
      }),
      chatId: chatId,
      name: name,
      dialog: dialog,
      date: date,
      ...(custClass ? { customClass: custClass } : {}),
      ...(unreadCount ? { unreadCount: unreadCount } : {}),
      events: {
        click: async () => {
          window.store.set({
            pickedChat: { chatId: chatId, chatTitle: name, chatAvatar: avatar },
            tokenChat: "",
          });
          await ChatService.getChatToken(chatId).catch(console.log);
        },
      },
    });
  }

  render(): DocumentFragment {
    return this.compile(ChatItem);
  }
}
