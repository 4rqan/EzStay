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

export const apiUrl = "http://localhost:4000/";

export const generateImagePath = (filePath) => {
  if (filePath) return apiUrl + filePath;
  return "/logo192.png";
};

export const objectToFormData = (obj) => {
  const formData = new FormData();
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] instanceof FileList) {
      for (let i = 0; i < obj[key].length; i++) {
        formData.append(key, obj[key][i]);
      }
    } else if (
      typeof obj[key] === "object" &&
      !(obj[key] instanceof FileList)
    ) {
      const nestedFormData = objectToFormData(obj[key]);
      for (const nestedKey of nestedFormData.keys()) {
        formData.append(`${key}[${nestedKey}]`, nestedFormData.get(nestedKey));
      }
    } else {
      formData.append(key, obj[key].toString());
    }
  }
  return formData;
};
