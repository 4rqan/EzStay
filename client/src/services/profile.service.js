import axios from "../utils/axios_client";

export const getProfile = (cb) => {
  axios.get("/api/profile").then(({ data }) => {
    cb(data);
  });
};
