export const BASE_URL = "https://ya-praktikum.tech/api/v2";

export const API = {
  login: `${BASE_URL + "/auth/signin"}`,
  registration: `${BASE_URL + "/auth/signup"}`,
  userInfo: `${BASE_URL + "/auth/user"}`,
  logout: `${BASE_URL + "/auth/logout"}`,
  changeUserData: `${BASE_URL + "/user/profile"}`,
  changeUserAvatar: `${BASE_URL + "/user/profile/avatar"}`,
  changeUserPasswor: `${BASE_URL + "/user/password"}`,
  searchUserByLogin: `${BASE_URL + "/user/search"}`,
  uploadFileToServer: `${BASE_URL + "/resources"}`,
  chatList: `${BASE_URL + "/chats"}`,
  createChat: `${BASE_URL + "/chats"}`,
};
