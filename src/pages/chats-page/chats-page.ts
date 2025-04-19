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
import { API } from "../../shared/models/api";

const form = {
  search: "",
};

const debouncedSearch = debounce(() => {
  ChatService.getChatList(form.search).catch(console.log);
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
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.search = target.value;
        debouncedSearch();
      }
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
  type: "submit",
  attr: {
    class: "button-wrapper",
  },
  additionalClass: "button-filled new-chat-btn",
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
      events: {
        submit: async (event: Event) => {
          event.preventDefault();
          await ChatService.createChat({ title: form.search }).catch(
            console.log
          );
        },
      },
    });
    window.store.on("Updated", this.updateChats.bind(this));
    this.loadChatList();
    this.updateChats();
  }

  async loadChatList(): Promise<void> {
    const input = document.querySelector(".search-input");
    if (input && input instanceof HTMLInputElement) {
      input.value = "";
      form.search = "";
    }
    if (!this.isChatsLoaded) {
      this.isChatsLoaded = true;
      await ChatService.getChatList().catch(console.log);
    }
  }

  updateChats(): void {
    let updatedChats: ChatListItemComponent[];
    const storeChatsList = window.store.getState().chats;

    if (storeChatsList && storeChatsList.length) {
      updatedChats = storeChatsList.map(
        (chat) =>
          new ChatListItemComponent(
            chat.id,
            chat.title,
            chat.last_message?.content || "",
            chat.last_message?.time
              ? formatDateToMSgType(chat.last_message?.time)
              : "",
            chat.unread_count,
            chat.avatar ? API.uploadFileToServer + chat.avatar : ""
          )
      );
    } else {
      updatedChats = [];
    }
    const chatID = window.store.getState().pickedChat?.chatId;
    this.setProps({
      chats: updatedChats,
      chat: chatID ? new ChatComponent() : null,
    });
  }

  render(): DocumentFragment {
    return this.compile(ChatsPage);
  }
}
