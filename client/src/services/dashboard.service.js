import axios from "../utils/axios_client";

export const getUsersByCities = (cb) => {
  axios.get("/api/usersbycities").then(({ data }) => {
    cb(data);
  });
};
