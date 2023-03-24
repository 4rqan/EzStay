import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const bookProperty = (model) => {
  axios.post("/api/bookings", model).then(({ data }) => {
    console.log(data);
    Swal.fire("Booking Successfull...");
  });
};

//bookingsForLandlord

export const bookingsForLandlord = (cb) => {
  axios.get("/api/bookingsForLandlord").then(({ data }) => {
    cb(data);
    console.log(data);
  });
};

export const getBookingDetails = (id, cb) => {
  axios.get("/api/bookings/" + id).then(({ data }) => {
    cb(data);
  });
};
