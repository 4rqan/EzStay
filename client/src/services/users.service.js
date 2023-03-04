import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const getAllUsers = (cb) => {
  axios.get("/api/users/list").then(({ data }) => {
    cb(data);
    console.log(data);
  });
};

export const changeUserStatus = (data, cb) => {
  axios.put("/api/users/status", data).then(({ data }) => {
    cb(data);
    Swal.fire("Status changed successfully.");
  });
};

export const changeApprovedStatus = (data, cb) => {
  axios.put("/api/users/approvedStatus", data).then(({ data }) => {
    cb(data);
    Swal.fire("Status changed successfully.");
  });
};
