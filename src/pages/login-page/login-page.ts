import "./login-page.scss";

import { default as LoginPage } from "./login-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import { PagesNames } from "../../shared/models/models";
import {
  setValidationProps,
  validatorService,
} from "../../shared/utils/validator";

const form = {
  login: "",
  password: "",
};

const emailInput = new InputComponent("div", {
  type: "text",
  name: "login",
  labelText: "Login",
  placeholder: "example@example.com",
  attr: { "custom-id": "user-login", class: "input-wrapper" },
  events: {
    input: (event: Event) =>
      (form.login = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        emailInput,
        form.login,
        validatorService.checkEmail(form.login).errorMsg
      ),
  },
});

const passwordInput = new InputComponent("div", {
  type: "password",
  name: "password",
  labelText: "Password",
  placeholder: "example",
  attr: { "custom-id": "user-password", class: "input-wrapper" },
  events: {
    input: (event: Event) => {
      form.password = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        passwordInput,
        form.password,
        validatorService.checkPassword(form.password).errorMsg
      ),
  },
});

const signInButton = new ButtonComponent("div", {
  link: PagesNames.chats,
  text: "Sign in",
  additionalClass: "button-filled",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: (event: Event) => {
      const isLoginValid = validatorService.checkEmail(form.login).errorMsg;
      const isPassValid = validatorService.checkPassword(
        form.password
      ).errorMsg;

      if (isLoginValid || isPassValid) {
        event.preventDefault();
        event.stopPropagation();
        if (isLoginValid) {
          setValidationProps(emailInput, form.login, isLoginValid);
        }
        if (isPassValid) {
          setValidationProps(passwordInput, form.password, isPassValid);
        }
      }

      console.log(form);
    },
  },
});

const registrationButton = new ButtonComponent("div", {
  link: PagesNames.registration,
  text: "Create account",
  attr: {
    class: "button-wrapper",
  },
});

const inputs = [emailInput, passwordInput];
const buttons = [signInButton, registrationButton];

export class LoginPageComponent extends Block {
  constructor() {
    super("form", {
      inputs,
      buttons,
      title: "Login",
      attr: {
        class: "auth-block",
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(LoginPage);
  }
}
