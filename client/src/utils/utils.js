import { isExpired } from "react-jwt";

// import { isExpired } from "react-jwt";
export const TOKEN_KEY = "ezstay_access_token";

export const getToken = () => {
  let str = localStorage[TOKEN_KEY];
  if (str) {
    return JSON.parse(str)?.token;
  }
};

export const setToken = (token) => {
  localStorage[TOKEN_KEY] = token;
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUserDetails = (data) => {
  setToken(data.token);
  localStorage.userId = data.userId;
  localStorage.email = data.email;
  localStorage.username = data.username;
};

export const logout = () => {
  removeToken();
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
  localStorage.removeItem("username");
};

export const isLoggedIn = () => {
  return !isExpired(getToken());
};

export const apiUrl = "http://localhost:3001/";

export const generateImagePath = (filePath) => {
  if (filePath) return apiUrl + filePath;
  return "/logo192.png";
};
