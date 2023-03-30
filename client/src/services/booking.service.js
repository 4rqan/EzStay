import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const bookProperty = (model) => {
  axios
    .post("/api/bookings", model)
    .then(({ data }) => {
      //navigate it to booking details
      Swal.fire("Booking Placed...");
    })
    .catch(({ response }) => {
      Swal.fire({ text: response.data, icon: "error" });
    });
};

//bookingsForLandlord

export const bookingsForLandlord = (cb) => {
  axios.get("/api/bookingsForLandlord").then(({ data }) => {
    cb(data);
    console.log(data);
  });
};

export const bookingsForUser = (cb) => {
  axios.get("/api/bookingsForUser").then(({ data }) => {
    cb(data);
  });
};

export const getBookingDetails = (id, cb) => {
  axios.get("/api/bookings/" + id).then(({ data }) => {
    cb(data);
  });
};

export const addComment = (id, comment, cb) => {
  axios.post("/api/addComment", { id, comment }).then(({ data }) => {
    Swal.fire("Comment added.");
    cb(data);
  });
};

export const processRequest = (model, cb) => {
  axios.post("/api/processRequest", model).then(({ data }) => {
    Swal.fire("Status updated.");
    cb(data);
  });
};
