import "./profile-page.scss";
import { default as ProfilePage } from "./profile-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import { AvatarComponent } from "../../shared/components/avatar/avatar";
import { Router } from "../../router/router";
import { RoutesLinks } from "../../shared/models/models";

const email = new InputComponent("div", {
  type: "text",
  labelText: "Email",
  name: "email",
  value: "example@example.com",
  disabled: "true",
  attr: {
    "custom-id": "email",

    class: "profile-form-control",
  },
});

const login = new InputComponent("div", {
  type: "text",
  labelText: "Login",
  name: "login",
  value: "ivanivanov",
  disabled: "true",
  attr: {
    "custom-id": "login",
    class: "profile-form-control",
  },
});

const firstName = new InputComponent("div", {
  type: "text",
  labelText: "First name",
  name: "first_name",
  value: "Ivan",
  disabled: "true",
  attr: {
    "custom-id": "first_name",
    class: "profile-form-control",
  },
});

const secondName = new InputComponent("div", {
  type: "text",
  labelText: "Second name",
  name: "second_name",
  value: "Ivanov",
  disabled: "true",
  attr: {
    "custom-id": "second_name",
    class: "profile-form-control",
  },
});

const phone = new InputComponent("div", {
  type: "text",
  labelText: "Phone",
  name: "phone",
  value: "+7(000)0000000",
  disabled: "true",
  attr: {
    "custom-id": "phone",
    class: "profile-form-control",
  },
});

const changeProfileButton = new ButtonComponent("div", {
  link: "changeProfile",
  text: "Change Info",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.changeProfile),
  },
});

const changePasswordButton = new ButtonComponent("div", {
  link: "changePassword",
  text: "Change password",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.changePassword),
  },
});

const gotToChartsButton = new ButtonComponent("div", {
  link: "chats",
  text: "Close",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.chats),
  },
});

const avatar = new AvatarComponent("div", {
  avatarLink: "/Union.png",
  additionalClass: "avatar-large",
});

const inputs = [email, login, firstName, secondName, phone];
const buttons = [changeProfileButton, changePasswordButton, gotToChartsButton];

export class ProfilePageComponent extends Block {
  constructor() {
    super("div", {
      avatar,
      inputs,
      buttons,
      title: "Ivan",
      attr: {
        class: "profile-page-wrapper",
      },
    });
    this.setProps({ title: window.store.getState().user?.first_name });
    email.setProps({ value: window.store.getState().user?.email });
    login.setProps({ value: window.store.getState().user?.login });
    firstName.setProps({ value: window.store.getState().user?.first_name });
    secondName.setProps({ value: window.store.getState().user?.second_name });
    phone.setProps({ value: window.store.getState().user?.phone });
    avatar.setProps({
      avatarLink: window.store.getState().user?.avatar
        ? "https://ya-praktikum.tech/api/v2/resources/" +
          window.store.getState().user?.avatar
        : "/Union.png",
    });
  }

  render(): DocumentFragment {
    return this.compile(ProfilePage);
  }
}
