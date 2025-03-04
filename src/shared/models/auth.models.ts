import { userInfo } from "os";
import { RequestBody } from "../utils/httpClient";

export interface UserLogin extends RequestBody {
  login: string;
  password: string;
}

export interface UserRegistration extends RequestBody {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface UserInfo extends RequestBody {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string | null;
  email: string;
}

export type UserLoginResponseObj = "OK" | { reason: string };

export type UserRegistrationResponseObj = { id: number } | { reason: string };

export type UserDataForChange = Omit<UserInfo, "id">;

export interface UserChangePasswordObj {
  [key: string]: unknown;
  oldPassword: string;
  newPassword: string;
}

export interface UserSearchObj {
  [key: string]: unknown;
  login: string;
}
