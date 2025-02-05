import { Block } from "../components/block";
import { ValidationError } from "../models/models";

export const validatorService = {
  checkName(value: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };
    const regexp = /^[A-ZА-ЯЁ][a-zа-яё-]*$/;

    if (!value.length) {
      error.errorMsg = "Field is required";
      return error;
    }

    if (!regexp.test(value)) {
      error.errorMsg =
        "Latin or Cyrillic, the first letter must be capitalized, no spaces, no numbers, no special characters (only a hyphen is allowed)";
    }

    return error;
  },

  checkLogin(value: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };
    const regexp = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;

    if (!value.length) {
      error.errorMsg = "Field is required";
      return error;
    }

    if (!regexp.test(value)) {
      error.errorMsg =
        "from 3 to 20 characters, Latin, may contain numbers, but not consist of them, no spaces, no special characters (hyphens and underscores are acceptable).";
    }
    return error;
  },

  checkEmail(value: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };
    const regexp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+$/;

    if (!value.length) {
      error.errorMsg = "Field is required";
      return error;
    }
    if (!regexp.test(value)) {
      error.errorMsg =
        "Latin, may include numbers and special characters such as hyphens and underscores, there must be a “dog” (@) and a dot after it, but there must be letters before the dot";
      return error;
    }

    return error;
  },

  checkPassword(value: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };
    const regexp = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

    if (!value.length) {
      error.errorMsg = "Field is required";
      return error;
    }
    if (!regexp.test(value)) {
      error.errorMsg =
        "from 8 to 40 characters, at least one capital letter and number are required";
      return error;
    }
    return error;
  },

  checkPasswordVerify(first: string, second: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };
    if (first !== second) {
      error.errorMsg = "Value must be the same as password";
      return error;
    }
    return error;
  },

  checkPhone(value: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };
    const regexp = /^\+?\d{10,15}$/;

    if (!value.length) {
      error.errorMsg = "Field is required";
      return error;
    }
    if (!regexp.test(value)) {
      error.errorMsg =
        "from 10 to 15 characters, consists of numbers, may start with a plus";
      return error;
    }

    return error;
  },

  checkMsg(value: string): ValidationError {
    const error: ValidationError = {
      errorMsg: "",
    };

    if (!value.length) {
      error.errorMsg = "Field is required";
      return error;
    }

    return error;
  },
};

export function setValidationProps(
  component: Block,
  value: string,
  errorText: string
): void {
  component.setProps({ value: value, errorText: errorText });
}
