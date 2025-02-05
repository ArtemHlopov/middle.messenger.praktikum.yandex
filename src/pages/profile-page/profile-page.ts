import "./profile-page.scss";
import { default as ProfilePage } from "./profile-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import { AvatarComponent } from "../../shared/components/avatar/avatar";

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
const nickName = new InputComponent("div", {
  type: "text",
  labelText: "Nickname",
  name: "display_name",
  value: "Ivan",
  disabled: "true",
  attr: {
    "custom-id": "display_name",
    class: "profile-form-control",
  },
});
const phone = new InputComponent("div", {
  type: "text",
  labelText: "Phone",
  name: "phone",
  value: "+7(909)9673030",
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
});
const changePasswordButton = new ButtonComponent("div", {
  link: "changePassword",
  text: "Change password",
  attr: {
    class: "button-wrapper",
  },
});
const gotToChartsButton = new ButtonComponent("div", {
  link: "chats",
  text: "Close",
  attr: {
    class: "button-wrapper",
  },
});

const avatar = new AvatarComponent("div", {
  avatarLink: "/Union.png",
  additionalClass: "avatar-large",
});

const inputs = [email, login, firstName, secondName, nickName, phone];
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
  }
  render(): DocumentFragment {
    return this.compile(ProfilePage);
  }
}
