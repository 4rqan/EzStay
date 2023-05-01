import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const bookProperty = (model, navigate) => {
  axios
    .post("/api/bookings", model)
    .then(({ data }) => {
      //navigate it to booking details
      navigate("/booking/" + data._id);
      Swal.fire("Booking Placed...");
    })
    .catch(({ response }) => {
      Swal.fire({ text: response.data, icon: "error" });
    });
};

export const bookingsForLandlord = (cb) => {
  axios.get("/api/bookingsForLandlord").then(({ data }) => {
    cb(data);
  });
};

export const propertyBookingsForUser = (cb) => {
  axios.get("/api/bookingsForUser").then(({ data }) => {
    cb(data);
  });
};

export const getPropertyBookingDetails = (id, cb) => {
  axios.get("/api/bookings/" + id).then(({ data }) => {
    cb(data);
  });
};

export const addCommentToPropertyBooking = (id, comment, cb) => {
  axios.post("/api/addComment", { id, comment }).then(({ data }) => {
    Swal.fire("Comment added.");
    cb(data);
  });
};

export const cancelPropertyRequest = (id, cb) => {
  axios.post("/api/cancelRequest", { id }).then(({ data }) => {
    Swal.fire("Booking Cancelled");
    cb(data);
  });
};

export const processPropertyRequest = (model, cb) => {
  axios.post("/api/processRequest", model).then(({ data }) => {
    Swal.fire("Status updated.");
    cb(data);
  });
};
