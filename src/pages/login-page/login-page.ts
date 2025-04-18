import "./login-page.scss";

import { default as LoginPage } from "./login-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import { PagesNames, RoutesLinks } from "../../shared/models/models";
import {
  setValidationProps,
  validatorService,
} from "../../shared/utils/validator";
import { Router } from "../../router/router";
import * as AuthService from "../../shared/services/auth-service";

const form = {
  login: "",
  password: "",
};

const emailInput = new InputComponent("div", {
  type: "text",
  name: "login",
  labelText: "Login",
  placeholder: "example",
  attr: { "custom-id": "user-login", class: "input-wrapper" },
  events: {
    input: (event: Event) =>
      (form.login = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        emailInput,
        form.login,
        validatorService.checkLogin(form.login).errorMsg
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
    click: async (event: Event) => {
      const isLoginValid = validatorService.checkLogin(form.login).errorMsg;
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
      } else {
        try {
          await AuthService.login(form);
          Router.getInstance().go(RoutesLinks.chats);
        } catch {
          setValidationProps(
            passwordInput,
            form.password,
            "Login or password isn't correct"
          );
        }
      }
    },
  },
});

const registrationButton = new ButtonComponent("div", {
  link: PagesNames.registration,
  text: "Create account",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.registration),
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
