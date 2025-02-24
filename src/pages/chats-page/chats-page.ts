import "./chats-page.scss";

import { default as ChatsPage } from "./chats-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { AvatarComponent } from "../../shared/components/avatar/avatar";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import { ChatListItemComponent } from "../../shared/components/chat-list-item/chat-list-item";
import { Router } from "../../router/router";
import { RoutesLinks } from "../../shared/models/models";

const searchInput = new InputComponent("div", {
  type: "text",
  name: "search-input",
  additionalClass: "input-filled",
  placeholder: "Search",
  attr: {
    "custom-id": "search-input",
    class: "profile-form-control",
  },
});
const sendMsgInput = new InputComponent("div", {
  type: "text",
  name: "new-message",
  placeholder: "Message",
  additionalClass: "input-filled",
  attr: {
    "custom-id": "new-message",
    class: "profile-form-control",
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

const listItem1 = new ChatListItemComponent(
  1,
  "Andrew",
  "qwerty-test1",
  "17:50",
  4
);
const listItem2 = new ChatListItemComponent(
  2,
  "Cinema-club",
  "qwerty-test2",
  "Fr",
  null
);
const listItem3 = new ChatListItemComponent(
  3,
  "Ilya",
  "qwerty-test3",
  ">Month",
  null
);
const listItem4 = new ChatListItemComponent(
  4,
  "Vadim",
  "qwerty-test4",
  ">Year",
  null,
  "active"
);
const listItem5 = new ChatListItemComponent(
  5,
  "Dialogs",
  "qwerty-test5",
  "Yesterday",
  4
);
const listItem6 = new ChatListItemComponent(
  6,
  "1, 2, 3",
  "qwerty-test6",
  "03:50",
  null
);
const listItem7 = new ChatListItemComponent(
  7,
  "Design destroyer",
  "qwerty-test7",
  "Mn",
  null
);
const listItem8 = new ChatListItemComponent(
  8,
  "Day",
  "qwerty-test8",
  "<Week",
  null
);
const listItem9 = new ChatListItemComponent(
  9,
  "Stas",
  "qwerty-test9",
  ">Week",
  null
);
const listItem10 = new ChatListItemComponent(
  10,
  "qwerty10",
  "qwerty-test10",
  "Yesterday",
  null
);

const buttons = [
  goToClientErrorPageButton,
  goToServerErrorPageButton,
  goToProfilePageButton,
];

const chats = [
  listItem1,
  listItem2,
  listItem3,
  listItem4,
  listItem5,
  listItem6,
  listItem7,
  listItem8,
  listItem9,
  listItem10,
];
export class ChatsPageComponent extends Block {
  constructor() {
    super("div", {
      avatar,
      searchInput,
      sendMsgInput,
      buttons,
      chats,
      attr: {
        class: "chats-page-wrapper",
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(ChatsPage);
  }
}
