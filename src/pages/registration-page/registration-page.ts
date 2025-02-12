import "./registration-page.scss";
import { default as RegistrationPage } from "./registration-page.hbs?raw";
import { Block } from "../../shared/components/block";
import { InputComponent } from "../../shared/components/input/input";
import { ButtonComponent } from "../../shared/components/button/button";
import {
  setValidationProps,
  validatorService,
} from "../../shared/utils/validator";

const form = {
  email: "",
  login: "",
  firstName: "",
  secondName: "",
  phone: "",
  password: "",
  passwordVerify: "",
};

const emailInput = new InputComponent("div", {
  type: "text",
  name: "email",
  labelText: "Email",
  placeholder: "example@example.com",
  attr: {
    "data-id": "email",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) =>
      (form.email = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        emailInput,
        form.login,
        validatorService.checkEmail(form.email).errorMsg
      ),
  },
});
const loginInput = new InputComponent("div", {
  type: "text",
  name: "login",
  labelText: "Login",
  placeholder: "example",
  attr: {
    "data-id": "login",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) =>
      (form.login = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        loginInput,
        form.login,
        validatorService.checkLogin(form.login).errorMsg
      ),
  },
});
const userName = new InputComponent("div", {
  type: "text",
  name: "first_name",
  labelText: "First name",
  placeholder: "example",
  attr: {
    "data-id": "first_name",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) =>
      (form.firstName = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        userName,
        form.firstName,
        validatorService.checkName(form.firstName).errorMsg
      ),
  },
});
const userSecondName = new InputComponent("div", {
  type: "text",
  name: "second_name",
  labelText: "Second name",
  placeholder: "example",
  attr: {
    "data-id": "second_name",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) =>
      (form.secondName = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        userSecondName,
        form.secondName,
        validatorService.checkName(form.secondName).errorMsg
      ),
  },
});
const userPhone = new InputComponent("div", {
  type: "text",
  name: "phone",
  labelText: "Phone",
  placeholder: "+7-777-777-77-77",
  attr: {
    "data-id": "phone",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) =>
      (form.phone = (event.target as HTMLInputElement).value),
    focusout: () =>
      setValidationProps(
        userPhone,
        form.phone,
        validatorService.checkPhone(form.phone).errorMsg
      ),
  },
});
const userPassword = new InputComponent("div", {
  type: "password",
  name: "password",
  labelText: "Password",
  placeholder: "example",
  attr: {
    "data-id": "password",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) => {
      form.password = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        userPassword,
        form.password,
        validatorService.checkPassword(form.password).errorMsg
      ),
  },
});
const userPasswordRetry = new InputComponent("div", {
  type: "password",
  name: "password_verify",
  labelText: "Password (again)",
  placeholder: "example",
  attr: {
    "data-id": "password_verify",
    class: "input-wrapper",
  },
  events: {
    input: (event: Event) => {
      form.passwordVerify = (event.target as HTMLInputElement).value;
    },

    focusout: () =>
      setValidationProps(
        userPasswordRetry,
        form.passwordVerify,
        validatorService.checkPasswordVerify(form.password, form.passwordVerify)
          .errorMsg
      ),
  },
});

const createButton = new ButtonComponent("div", {
  link: "chats",
  text: "Create account",
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
      const isPassValid = validatorService.checkPassword(
        form.password
      ).errorMsg;
      const isPasVeryValid = validatorService.checkPasswordVerify(
        form.password,
        form.passwordVerify
      ).errorMsg;

      if (
        isEmailValid ||
        isLoginValid ||
        isPassValid ||
        isNameValid ||
        isSecondNameValid ||
        isPhoneValid ||
        isPasVeryValid
      ) {
        event.preventDefault();
        event.stopPropagation();
        if (isEmailValid) {
          setValidationProps(emailInput, form.email, isEmailValid);
        }
        if (isLoginValid) {
          setValidationProps(loginInput, form.login, isLoginValid);
        }
        if (isNameValid) {
          setValidationProps(userName, form.firstName, isNameValid);
        }
        if (isSecondNameValid) {
          setValidationProps(
            userSecondName,
            form.secondName,
            isSecondNameValid
          );
        }
        if (isPhoneValid) {
          setValidationProps(userPhone, form.phone, isPhoneValid);
        }
        if (isPassValid) {
          setValidationProps(userPassword, form.password, isPassValid);
        }
        if (isPasVeryValid) {
          setValidationProps(
            userPasswordRetry,
            form.passwordVerify,
            isPasVeryValid
          );
        }
      }

      console.log(form);
    },
  },
});
const signInButton = new ButtonComponent("div", {
  link: "login",
  text: "Sign in",
  attr: {
    class: "button-wrapper",
  },
  events: {},
});

const inputs = [
  emailInput,
  loginInput,
  userName,
  userSecondName,
  userPhone,
  userPassword,
  userPasswordRetry,
];
const buttons = [createButton, signInButton];

export class RegistrationPageComponent extends Block {
  constructor() {
    super("form", {
      inputs,
      buttons,
      title: "Registration",
      attr: {
        class: "auth-block",
        style: "width:580px", //to normal display all errors msg
      },
    });
  }
  render(): DocumentFragment {
    return this.compile(RegistrationPage);
  }
}
