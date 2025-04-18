import "./chats-page.scss";

import { default as ChatsPage } from "./chats-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { AvatarComponent } from "../../shared/components/avatar/avatar";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import { ChatListItemComponent } from "../../shared/components/chat-list-item/chat-list-item";
import { Router } from "../../router/router";
import { RoutesLinks } from "../../shared/models/models";
import * as ChatService from "../../shared/services/chats-service";
import { ChatComponent } from "../../shared/components/chat/chat";
import { debounce, formatDateToMSgType } from "../../shared/utils/helpers";
import wsChat from "../../store/socket";
import {
  ChatMessageExtendedObj,
  ChatMessageObj,
} from "../../shared/models/chat.models";

const form = {
  search: "",
};

const debouncedSearch = debounce(() => {
  ChatService.getChatList(form.search);
}, 1000);

const searchInput = new InputComponent("div", {
  type: "text",
  name: "search-input",
  additionalClass: "input-filled search-input",
  placeholder: "Enter chat name for add/search",
  attr: {
    "custom-id": "search-input",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      form.search = (event.target as HTMLInputElement).value;
      debouncedSearch();
    },
  },
});

const avatar = new AvatarComponent("div");

const goToClientErrorPageButton = new ButtonComponent("div", {
  link: "clientError",
  text: "404",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.clientError),
  },
});

const goToServerErrorPageButton = new ButtonComponent("div", {
  link: "serverError",
  text: "505",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.serverError),
  },
});

const goToProfilePageButton = new ButtonComponent("div", {
  link: "profile",
  text: "Profile",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.profile),
  },
});

const createChatBtn = new ButtonComponent("div", {
  text: "Create chat",
  attr: {
    class: "button-wrapper",
  },
  additionalClass: "button-filled new-chat-btn",
  events: {
    click: () => ChatService.createChat({ title: form.search }),
  },
});

const buttons = [
  goToClientErrorPageButton,
  goToServerErrorPageButton,
  goToProfilePageButton,
];

export class ChatsPageComponent extends Block {
  private isChatsLoaded = false;

  constructor() {
    super("div", {
      avatar,
      searchInput,
      createChatBtn,
      buttons,
      attr: {
        class: "chats-page-wrapper",
      },
    });
    window.store.on("Updated", this.updateChats.bind(this));
    this.loadChatList();
    this.updateChats();
  }

  async loadChatList(): Promise<void> {
    const input = document.querySelector(".search-input");
    if (input) {
      (input as HTMLInputElement).value = "";
      form.search = "";
    }
    if (!this.isChatsLoaded) {
      this.isChatsLoaded = true;
      await ChatService.getChatList();
    }
  }

  updateChats(): void {
    let updatedChats: ChatListItemComponent[];
    if (
      window.store.getState().chats &&
      window.store.getState().chats?.length
    ) {
      updatedChats = window.store
        .getState()
        .chats?.map(
          (chat) =>
            new ChatListItemComponent(
              chat.id,
              chat.title,
              chat.last_message?.content || "",
              chat.last_message?.time
                ? formatDateToMSgType(chat.last_message?.time)
                : "",
              chat.unread_count,
              chat.avatar || ""
            )
        ) as ChatListItemComponent[];
    } else {
      updatedChats = [];
    }
    const chatID = window.store.getState().pickedChat?.chatId;
    this.setProps({
      ...this._props,
      chats: updatedChats,
      chat: chatID ? new ChatComponent() : null,
    });
  }

  render(): DocumentFragment {
    return this.compile(ChatsPage);
  }
}
