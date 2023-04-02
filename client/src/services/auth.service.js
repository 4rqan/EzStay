import axios from "../utils/axios_client";
import Swal from "sweetalert2";

export const login = (model, cb) => {
  axios
    .post("/api/login", model)
    .then(({ data }) => {
      cb(data);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const changePassword = (model) => {
  axios
    .put("/api/changePassword", model)
    .then(() => {
      Swal.fire("Password changed successfully");
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const signup = (model, cb) => {
  axios
    .post("/api/signup", model)
    .then(({ data }) => {
      cb(data);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const forgotPassword = (model) => {
  axios
    .post("/api/forgotPassword", model)
    .then(({ data }) => {
      Swal.fire(data);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const resetPassword = (model, navigate) => {
  axios
    .post("/api/resetPassword", model)
    .then(({ data }) => {
      Swal.fire(data);
      navigate("/login");
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};
