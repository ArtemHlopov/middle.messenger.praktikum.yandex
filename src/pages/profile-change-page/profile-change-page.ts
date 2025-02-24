import { Block } from "../../shared/components/block";
import "./profile-change-page.scss";

import { default as ProfileChangePage } from "./profile-change-page.hbs?raw";
import { AvatarComponent } from "../../shared/components/avatar/avatar";
import { ButtonComponent } from "../../shared/components/button/button";
import { InputComponent } from "../../shared/components/input/input";
import {
  setValidationProps,
  validatorService,
} from "../../shared/utils/validator";
import { Router } from "../../router/router";
import { RoutesLinks } from "../../shared/models/models";

const form = {
  email: "example@example.com",
  login: "ivanivanov",
  firstName: "Ivan",
  secondName: "Ivanov",
  nickName: "Ivan",
  phone: "+7(909)9673030",
};

const email = new InputComponent("div", {
  type: "text",
  labelText: "Email",
  name: "email",
  value: form.email,
  attr: {
    "custom-id": "email",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.email = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        email,
        form.email,
        validatorService.checkEmail(form.email).errorMsg
      ),
  },
});
const login = new InputComponent("div", {
  type: "text",
  labelText: "Login",
  name: "login",
  value: form.login,

  attr: {
    "custom-id": "login",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.login = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        login,
        form.login,
        validatorService.checkLogin(form.login).errorMsg
      ),
  },
});
const firstName = new InputComponent("div", {
  type: "text",
  labelText: "First name",
  name: "first_name",
  value: form.firstName,

  attr: {
    "custom-id": "first_name",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.firstName = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        firstName,
        form.firstName,
        validatorService.checkName(form.firstName).errorMsg
      ),
  },
});
const secondName = new InputComponent("div", {
  type: "text",
  labelText: "Second name",
  name: "second_name",
  value: form.secondName,

  attr: {
    "custom-id": "second_name",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.secondName = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        secondName,
        form.secondName,
        validatorService.checkName(form.secondName).errorMsg
      ),
  },
});

const nickName = new InputComponent("div", {
  type: "text",
  labelText: "Nickname",
  name: "display_name",
  value: form.nickName,

  attr: {
    "custom-id": "display_name",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.nickName = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        nickName,
        form.nickName,
        validatorService.checkName(form.nickName).errorMsg
      ),
  },
});

const phone = new InputComponent("div", {
  type: "text",
  labelText: "Phone",
  name: "phone",
  value: form.phone,

  attr: {
    "custom-id": "phone",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) =>
      (form.phone = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        phone,
        form.phone,
        validatorService.checkPhone(form.phone).errorMsg
      ),
  },
});
const inputs = [email, login, firstName, secondName, nickName, phone];

const button = new ButtonComponent("div", {
  link: "chats",
  text: "Save",
  additionalClass: "button-filled",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: (event: Event) => {
      const isEmailValid = validatorService.checkEmail(form.email).errorMsg;
      const isLoginValid = validatorService.checkLogin(form.login).errorMsg;
      const isNameValid = validatorService.checkName(form.firstName).errorMsg;
      const isSecondNameValid = validatorService.checkName(
        form.secondName
      ).errorMsg;
      const isPhoneValid = validatorService.checkPhone(form.phone).errorMsg;
      const isNickValid = validatorService.checkName(form.nickName).errorMsg;

      if (
        isEmailValid ||
        isLoginValid ||
        isNameValid ||
        isSecondNameValid ||
        isPhoneValid ||
        isNickValid
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (isEmailValid) {
          setValidationProps(email, form.email, isEmailValid);
        }
        if (isLoginValid) {
          setValidationProps(login, form.login, isLoginValid);
        }
        if (isNameValid) {
          setValidationProps(firstName, form.firstName, isNameValid);
        }
        if (isSecondNameValid) {
          setValidationProps(secondName, form.secondName, isSecondNameValid);
        }
        if (isPhoneValid) {
          setValidationProps(phone, form.phone, isPhoneValid);
        }
        if (isNickValid) {
          setValidationProps(nickName, form.nickName, isNickValid);
        }
      } else {
        Router.getInstance().go(RoutesLinks.chats);
      }
    },
  },
});

const avatar = new AvatarComponent("div", {
  avatarLink: "/Union.png",
  additionalClass: "avatar-large",
});
export class ProfileChangePageComponent extends Block {
  constructor() {
    super("div", {
      avatar,
      inputs,
      button,
      title: "Ivan",
      attr: {
        class: "profile-change-page-wrapper",
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(ProfileChangePage);
  }
}
