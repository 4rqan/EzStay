import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const addListings = (model) => {
  axios.post("/api/rentallistings", model).then(() => {
    Swal.fire("Saved successfully;");
  });
};
