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
import * as UserService from "../../shared/services/user-service";
import { Router } from "../../router/router";
import { Indexed, RoutesLinks } from "../../shared/models/models";

interface profileChangePageForm extends Indexed {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  avatar: string | null;
}

const form: profileChangePageForm = {
  email: window.store?.getState().user?.email || "",
  login: window.store?.getState().user?.login || "",
  first_name: window.store?.getState().user?.first_name || "",
  second_name: window.store?.getState().user?.second_name || "",
  display_name: window.store?.getState().user?.display_name || "",
  phone: window.store?.getState().user?.phone || "",
  avatar: window.store?.getState().user?.avatar || null,
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
    input: (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.email = target.value;
      }
    },

    focusout: () => {
      setValidationProps(
        email,
        form.email,
        validatorService.checkEmail(form.email).errorMsg
      );
    },
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
    input: (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.login = target.value;
      }
    },
    focusout: () => {
      setValidationProps(
        login,
        form.login,
        validatorService.checkLogin(form.login).errorMsg
      );
    },
  },
});
const firstName = new InputComponent("div", {
  type: "text",
  labelText: "First name",
  name: "first_name",
  value: form.first_name,

  attr: {
    "custom-id": "first_name",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.first_name = target.value;
      }
    },
    focusout: () => {
      setValidationProps(
        firstName,
        form.first_name,
        validatorService.checkName(form.first_name).errorMsg
      );
    },
  },
});
const secondName = new InputComponent("div", {
  type: "text",
  labelText: "Second name",
  name: "second_name",
  value: form.second_name,

  attr: {
    "custom-id": "second_name",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.second_name = target.value;
      }
    },
    focusout: () => {
      setValidationProps(
        secondName,
        form.second_name,
        validatorService.checkName(form.second_name).errorMsg
      );
    },
  },
});

const nickName = new InputComponent("div", {
  type: "text",
  labelText: "Nickname",
  name: "display_name",
  value: form.display_name,

  attr: {
    "custom-id": "display_name",
    class: "profile-form-control",
  },
  events: {
    input: (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.display_name = target.value;
      }
    },
    focusout: () => {
      setValidationProps(
        nickName,
        form.display_name,
        validatorService.checkName(form.display_name).errorMsg
      );
    },
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
    input: (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLInputElement) {
        form.phone = target.value;
      }
    },
    focusout: () => {
      setValidationProps(
        phone,
        form.phone,
        validatorService.checkPhone(form.phone).errorMsg
      );
    },
  },
});
const inputs = [email, login, firstName, secondName, nickName, phone];

const button = new ButtonComponent("div", {
  text: "Save",
  additionalClass: "button-filled",
  type: "submit",
  attr: {
    class: "button-wrapper",
  },
});

const goToChatsButton = new ButtonComponent("div", {
  text: "Back to messenger",
  additionalClass: "button-filled",
  type: "button",
  attr: {
    class: "button-wrapper",
  },
  events: {
    click: () => Router.getInstance().go(RoutesLinks.chats),
  },
});

const avatar = new AvatarComponent("div", {
  avatarLink: form.avatar || "/Union.png",
  additionalClass: "avatar-large",
});

export class ProfileChangePageComponent extends Block {
  constructor() {
    super("div", {
      avatar,
      inputs,
      button,
      goToChatsButton,
      title: "Ivan",
      attr: {
        class: "profile-change-page-wrapper",
      },
      events: {
        change: async (event) => {
          if (event.target && event.target.files?.[0]) {
            UserService.changeUserAvatar(event.target.files[0]).catch(
              console.log
            );
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          const isEmailValid = validatorService.checkEmail(form.email).errorMsg;
          const isLoginValid = validatorService.checkLogin(form.login).errorMsg;
          const isNameValid = validatorService.checkName(
            form.first_name
          ).errorMsg;
          const isSecondNameValid = validatorService.checkName(
            form.second_name
          ).errorMsg;
          const isPhoneValid = validatorService.checkPhone(form.phone).errorMsg;
          const isNickValid = validatorService.checkName(
            form.display_name
          ).errorMsg;

          if (
            isEmailValid ||
            isLoginValid ||
            isNameValid ||
            isSecondNameValid ||
            isPhoneValid ||
            isNickValid
          ) {
            event.stopPropagation();
            if (isEmailValid) {
              setValidationProps(email, form.email, isEmailValid);
            }
            if (isLoginValid) {
              setValidationProps(login, form.login, isLoginValid);
            }
            if (isNameValid) {
              setValidationProps(firstName, form.first_name, isNameValid);
            }
            if (isSecondNameValid) {
              setValidationProps(
                secondName,
                form.second_name,
                isSecondNameValid
              );
            }
            if (isPhoneValid) {
              setValidationProps(phone, form.phone, isPhoneValid);
            }
            if (isNickValid) {
              setValidationProps(nickName, form.display_name, isNickValid);
            }
          } else {
            UserService.changeUserData(form)
              .then(async (data) => {
                if (data && "id" in data) {
                  window.store.set({ user: data });
                  Router.getInstance().go(RoutesLinks.chats);
                } else {
                  phone.setProps({
                    errorText: "Troubles with updating profile",
                  });
                }
              })
              .catch(console.log);
          }
        },
      },
    });
    window.store.on("Updated", this.updateProps.bind(this));
    this.updateProps();
  }

  updateProps(): void {
    Object.keys(form).forEach(
      (key) => (form[key] = window.store.getState().user?.[key] || "")
    );
    this.setProps({ title: window.store.getState().user?.first_name });
    email.setProps({ value: window.store.getState().user?.email });
    login.setProps({ value: window.store.getState().user?.login });
    firstName.setProps({ value: window.store.getState().user?.first_name });
    secondName.setProps({ value: window.store.getState().user?.second_name });
    phone.setProps({ value: window.store.getState().user?.phone });
    nickName.setProps({ value: window.store.getState().user?.display_name });
    avatar.setProps({
      avatarLink: window.store.getState().user?.avatar
        ? "https://ya-praktikum.tech/api/v2/resources/" +
          window.store.getState().user?.avatar
        : "/Union.png",
    });
  }

  render(): DocumentFragment {
    return this.compile(ProfileChangePage);
  }
}
