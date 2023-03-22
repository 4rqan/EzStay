import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const bookProperty = (model) => {
  axios.post("/api/bookings", model).then(({ data }) => {
    console.log(data);
    Swal.fire("Booking Successfull...");
  });
};
