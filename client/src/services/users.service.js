import axios from "../utils/axios_client";

export const getAllUsers = (cb) => {
  axios.get("/api/users/list").then(({ data }) => {
    cb(data);
    console.log(data);
  });
};
