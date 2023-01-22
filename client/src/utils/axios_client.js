import axios from "axios";
import { getToken } from "./utils";

const instance = axios.create();

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  
    return config;
  },

  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
