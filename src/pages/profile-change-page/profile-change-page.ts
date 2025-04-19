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
import { UserInfo } from "../../shared/models/auth.models";
import { Router } from "../../router/router";
import { RoutesLinks } from "../../shared/models/models";

const form: Omit<UserInfo, "id"> = {
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
    input: (event: Event) =>
      (form.email = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        email,
        form.email as string,
        validatorService.checkEmail(form.email as string).errorMsg
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
        form.login as string,
        validatorService.checkLogin(form.login as string).errorMsg
      ),
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
    input: (event: Event) =>
      (form.first_name = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        firstName,
        form.first_name as string,
        validatorService.checkName(form.first_name as string).errorMsg
      ),
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
    input: (event: Event) =>
      (form.second_name = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        secondName,
        form.second_name as string,
        validatorService.checkName(form.second_name as string).errorMsg
      ),
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
    input: (event: Event) =>
      (form.display_name = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        nickName,
        form.display_name as string,
        validatorService.checkName(form.display_name as string).errorMsg
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
        form.phone as string,
        validatorService.checkPhone(form.phone as string).errorMsg
      ),
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
        change: (event) => {
          if (event.target && event.target.files?.[0]) {
            UserService.changeUserAvatar(event.target.files[0]);
          }
        },
        submit: (event: Event) => {
          event.preventDefault();
          const isEmailValid = validatorService.checkEmail(
            form.email as string
          ).errorMsg;
          const isLoginValid = validatorService.checkLogin(
            form.login as string
          ).errorMsg;
          const isNameValid = validatorService.checkName(
            form.first_name as string
          ).errorMsg;
          const isSecondNameValid = validatorService.checkName(
            form.second_name as string
          ).errorMsg;
          const isPhoneValid = validatorService.checkPhone(
            form.phone as string
          ).errorMsg;
          const isNickValid = validatorService.checkName(
            form.display_name as string
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
              setValidationProps(email, form.email as string, isEmailValid);
            }
            if (isLoginValid) {
              setValidationProps(login, form.login as string, isLoginValid);
            }
            if (isNameValid) {
              setValidationProps(
                firstName,
                form.first_name as string,
                isNameValid
              );
            }
            if (isSecondNameValid) {
              setValidationProps(
                secondName,
                form.second_name as string,
                isSecondNameValid
              );
            }
            if (isPhoneValid) {
              setValidationProps(phone, form.phone as string, isPhoneValid);
            }
            if (isNickValid) {
              setValidationProps(
                nickName,
                form.display_name as string,
                isNickValid
              );
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
