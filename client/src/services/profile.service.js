import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const getProfile = (cb) => {
  axios.get("/api/profile").then(({ data }) => {
    data.address = data.address || {};
    cb(data);
    console.log(data);
  });
};

export const updateProfile = (model) => {
  axios.post("/api/profile", model).then(() => {
    Swal.fire("Saved successfully;");
  });
};
