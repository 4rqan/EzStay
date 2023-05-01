import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const bookWorker = (model, navigate) => {
  axios
    .post("/api/bookworker", model)
    .then(({ data }) => {
      Swal.fire("Booked successfully");
      navigate("/myservicebookings/" + data._id);
    })
    .catch(({ response }) => {
      Swal.fire({ text: response.data, icon: "error" });
    });
};

export const getBookingById = (id, cb) => {
  axios.get("/api/workerbookings/" + id).then(({ data }) => {
    cb(data);
  });
};

export const getBookingsForUser = (cb) => {
  axios.get("/api/servicebookings").then(({ data }) => {
    cb(data);
  });
};

export const getBookingsForWorker = (cb) => {
  axios.get("/api/workerbookings").then(({ data }) => {
    cb(data);
  });
};

export const addComment = (id, comment, cb) => {
  axios
    .post("/api/workerbooking/addComment", { id, comment })
    .then(({ data }) => {
      Swal.fire("Comment added.");
      cb(data);
    });
};

export const cancelRequest = (id, cb) => {
  axios.post("/api/workerbooking/cancel", { id }).then(({ data }) => {
    Swal.fire("Booking Cancelled");
    cb(data);
  });
};

export const processRequest = (model, cb) => {
  axios
    .post("/api/workerbooking/process", model)
    .then(({ data }) => {
      Swal.fire("Status updated.");
      cb(data);
    })
    .catch(showError);
};
