import { TemplatesData } from "../shared/models/models";
import { ChatsPageComponent } from "./chats-page/chats-page";
import { ClientErrorPageComponent } from "./client-error-page/client-error-page";
import { LoginPageComponent } from "./login-page/login-page";
import { ProfileChangePageComponent } from "./profile-change-page/profile-change-page";
import { ProfilePageComponent } from "./profile-page/profile-page";
import { ProfilePasswordPageComponent } from "./profile-password-page/profile-password-page";
import { RegistrationPageComponent } from "./registration-page/registration-page";
import { ServerErrorPageComponent } from "./server-error-page/server-error-page";

export const pagesList: TemplatesData = {
  login: LoginPageComponent,
  registration: RegistrationPageComponent,
  chats: ChatsPageComponent,
  profile: ProfilePageComponent,
  changeProfile: ProfileChangePageComponent,
  changePassword: ProfilePasswordPageComponent,
  clientError: ClientErrorPageComponent,
  serverError: ServerErrorPageComponent,
};
