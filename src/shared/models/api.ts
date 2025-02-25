export const BASE_URL = "https://ya-praktikum.tech/api/v2";

export const API = {
  login: `${BASE_URL + "/auth/signin"}`,
  registration: `${BASE_URL + "/auth/signup"}`,
  userInfo: `${BASE_URL + "/auth/user"}`,
  logout: `${BASE_URL + "/auth/logout"}`,
};
