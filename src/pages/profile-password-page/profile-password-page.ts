import "./profile-password-page.scss";

import { default as ProfilePasswordPage } from "./profile-password-page.hbs?raw";
import { Block } from "../../shared/components/block";
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
  oldPas: "example",
  newPas: "example",
  verifyPas: "example",
};

const newPassword = new InputComponent("div", {
  type: "password",
  labelText: "New password",
  name: "newPassword",
  value: form.newPas,
  attr: {
    "custom-id": "newPassword",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      form.newPas = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        newPassword,
        form.newPas,
        validatorService.checkPassword(form.newPas).errorMsg
      ),
  },
});

const oldPassword = new InputComponent("div", {
  type: "password",
  labelText: "Password",
  name: "oldPassword",
  value: form.oldPas,
  attr: {
    "custom-id": "oldPassword",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      form.oldPas = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        oldPassword,
        form.oldPas,
        validatorService.checkPassword(form.oldPas).errorMsg
      ),
  },
});

const passwordVerify = new InputComponent("div", {
  type: "password",
  labelText: "New password",
  name: "password_verify",
  value: form.verifyPas,
  attr: {
    "custom-id": "password_verify",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      form.verifyPas = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        passwordVerify,
        form.verifyPas,
        validatorService.checkPasswordVerify(form.newPas, form.verifyPas)
          .errorMsg
      ),
  },
});

const inputs = [oldPassword, newPassword, passwordVerify];

const button = new ButtonComponent("div", {
  link: "chats",
  text: "Save",
  additionalClass: "button-filled",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: (event: Event) => {
      const isOldPassValid = validatorService.checkPassword(
        form.oldPas
      ).errorMsg;
      const isNewPassValid = validatorService.checkPassword(
        form.newPas
      ).errorMsg;
      const isPasVeryValid = validatorService.checkPasswordVerify(
        form.newPas,
        form.verifyPas
      ).errorMsg;

      if (isOldPassValid || isNewPassValid || isPasVeryValid) {
        event.preventDefault();
        event.stopPropagation();

        if (isOldPassValid) {
          setValidationProps(oldPassword, form.oldPas, isOldPassValid);
        }
        if (isNewPassValid) {
          setValidationProps(newPassword, form.newPas, isNewPassValid);
        }
        if (isPasVeryValid) {
          setValidationProps(passwordVerify, form.verifyPas, isPasVeryValid);
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
export class ProfilePasswordPageComponent extends Block {
  constructor() {
    super("div", {
      avatar,
      inputs,
      button,
      attr: {
        class: "profile-change-page-wrapper",
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(ProfilePasswordPage);
  }
}
