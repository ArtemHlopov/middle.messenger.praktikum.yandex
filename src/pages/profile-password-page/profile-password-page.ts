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
import * as UserService from "../../shared/services/user-service";
import { Router } from "../../router/router";
import { RoutesLinks } from "../../shared/models/models";

const form = {
  oldPassword: "example",
  newPassword: "example",
  verifyPas: "example",
};

const newPassword = new InputComponent("div", {
  type: "password",
  labelText: "New password",
  name: "newPassword",
  value: form.newPassword,
  attr: {
    "custom-id": "newPassword",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      form.newPassword = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        newPassword,
        form.newPassword,
        validatorService.checkPassword(form.newPassword).errorMsg
      ),
  },
});

const oldPassword = new InputComponent("div", {
  type: "password",
  labelText: "Password",
  name: "oldPassword",
  value: form.oldPassword,
  attr: {
    "custom-id": "oldPassword",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      form.oldPassword = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        oldPassword,
        form.oldPassword,
        validatorService.checkPassword(form.oldPassword).errorMsg
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
        validatorService.checkPasswordVerify(form.newPassword, form.verifyPas)
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
        form.oldPassword
      ).errorMsg;
      const isNewPassValid = validatorService.checkPassword(
        form.newPassword
      ).errorMsg;
      const isPasVeryValid = validatorService.checkPasswordVerify(
        form.newPassword,
        form.verifyPas
      ).errorMsg;

      if (isOldPassValid || isNewPassValid || isPasVeryValid) {
        event.preventDefault();
        event.stopPropagation();

        if (isOldPassValid) {
          setValidationProps(oldPassword, form.oldPassword, isOldPassValid);
        }
        if (isNewPassValid) {
          setValidationProps(newPassword, form.newPassword, isNewPassValid);
        }
        if (isPasVeryValid) {
          setValidationProps(passwordVerify, form.verifyPas, isPasVeryValid);
        }
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { verifyPas, ...passwordData } = form;
        UserService.changeUserPassword(passwordData).then((response) => {
          if (response === "OK") {
            Router.getInstance().go(RoutesLinks.chats);
          } else {
            passwordVerify.setProps({ errorText: "Check entered passwords" });
          }
        });
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
    window.store.on("Updated", this.updateProps.bind(this));
    this.updateProps();
  }

  updateProps(): void {
    avatar.setProps({
      avatarLink: window.store.getState().user?.avatar
        ? "https://ya-praktikum.tech/api/v2/resources/" +
          window.store.getState().user?.avatar
        : "/Union.png",
    });
  }

  render(): DocumentFragment {
    return this.compile(ProfilePasswordPage);
  }
}
