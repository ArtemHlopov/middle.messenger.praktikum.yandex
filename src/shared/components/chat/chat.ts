import { Block } from "../block";
import "./chat.scss";
import { default as ChatTemplate } from "./chat.hbs?raw";
import { AvatarComponent } from "../avatar/avatar";
import { ButtonComponent } from "../button/button";
import { InputComponent } from "../input/input";
import wsChat, { WSEvents } from "../../../store/socket";
import {
  ChatMessageExtendedObj,
  ChatMessageObj,
} from "../../models/chat.models";
import { formatDateToMSgType } from "../../utils/helpers";
import { ChatSettingsModalComponent } from "../chat-settings-modal/chat-settings-modal";
import { API } from "../../models/api";

const form = {
  msg: "",
};

const sendMsgInput = new InputComponent("div", {
  type: "text",
  name: "modal-input",
  additionalClass: "input-filled chat-input",
  placeholder: "Enter yor message",
  attr: {
    "custom-id": "new-message",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.msg = (event.target as HTMLInputElement).value),
  },
});

const modal = new ChatSettingsModalComponent({
  title: "Chat settings",
  description: "Enter user ID",
});

export class ChatComponent extends Block {
  constructor() {
    const avatar = new AvatarComponent("div", {
      ...(window.store?.getState().pickedChat?.chatAvatar && {
        avatarLink: window.store.getState().pickedChat?.chatAvatar,
      }),
    });

    const sendMessageBth = new ButtonComponent("div", {
      text: "→",
      attr: {
        class: "button-wrapper",
      },
      class: "new-msg-button send-message",
      events: {
        click: () => {
          if (form.msg) {
            this.sendMessage(form.msg);
            const input = document.querySelector(".chat-input");
            if (input) {
              (input as HTMLInputElement).value = "";
              form.msg = "";
            }
          }
        },
      },
    });
    super("div", {
      modal,
      sendMsgInput,
      avatar,
      sendMessageBth,
      title: window.store?.getState().pickedChat?.chatTitle || "Chat",
      attr: { class: "chat-preview-block" },
    });
    wsChat.on(WSEvents.message, this.handleMessage.bind(this));
  }

  handleMessage() {
    const wsNewMessages = this.transformMessages(wsChat.messages);
    this.setProps({
      messages:
        wsNewMessages.length > 0
          ? wsNewMessages
          : [
              {
                content: "chat is empty",
                id: 123,
                time: "",
                type: "type",
                user_id: 123,
              },
            ],
    });
  }
  transformMessages(data: ChatMessageObj[]): ChatMessageExtendedObj[] {
    const userId = window.store.getState().user?.id;
    return data
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
      .map((item) => ({
        ...item,
        isMine: userId === item.user_id,
        time: formatDateToMSgType(item.time),
      }));
  }

  sendMessage(value: string) {
    wsChat.sendNewMessage(value);
  }

  render(): DocumentFragment {
    return this.compile(ChatTemplate);
  }
}
