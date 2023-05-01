import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const bookProperty = (model, navigate) => {
  axios
    .post("/api/property/bookings", model)
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
  axios.get("/api/property/bookingsForLandlord").then(({ data }) => {
    cb(data);
  });
};

export const propertyBookingsForUser = (cb) => {
  axios.get("/api/property/bookingsForUser").then(({ data }) => {
    cb(data);
  });
};

export const getPropertyBookingDetails = (id, cb) => {
  axios.get("/api/property/bookings/" + id).then(({ data }) => {
    cb(data);
  });
};

export const addCommentToPropertyBooking = (id, comment, cb) => {
  axios.post("/api/property/addComment", { id, comment }).then(({ data }) => {
    Swal.fire("Comment added.");
    cb(data);
  });
};

export const cancelPropertyRequest = (id, cb) => {
  axios.post("/api/property/cancelRequest", { id }).then(({ data }) => {
    Swal.fire("Booking Cancelled");
    cb(data);
  });
};

export const processPropertyRequest = (model, cb) => {
  axios.post("/api/property/processRequest", model).then(({ data }) => {
    Swal.fire("Status updated.");
    cb(data);
  });
};

export const completePropertyBooking = (bookingId, cb) => {
  axios
    .post("/api/propertyBooking/complete", { bookingId })
    .then(({ data }) => {
      Swal.fire("Booking completed.");
      cb(data);
    })
    .catch(showError);
};
