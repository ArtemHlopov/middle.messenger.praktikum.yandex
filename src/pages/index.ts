import { TemplatesData } from "../shared/models/models";
import { ChatsPage } from "./chats-page/chats-page";
import { ClientErrorPage } from "./client-error-page/client-error-page";
import { LoginPage } from "./login-page/login-page";
import { ProfileChangePage } from "./profile-change-page/profile-change-page";
import { ProfilePage } from "./profile-page/profile-page";
import { ProfilePasswordPage } from "./profile-password-page/profile-password-page";
import { RegistrationPage } from "./registration-page/registration-page";
import { ServerErrorPage } from "./server-error-page/server-error-page";

export const pagesList: TemplatesData = {
  login: LoginPage,
  registration: RegistrationPage,
  chats: ChatsPage,
  profile: ProfilePage,
  changeProfile: ProfileChangePage,
  changePassword: ProfilePasswordPage,
  404: ClientErrorPage,
  505: ServerErrorPage,
};
