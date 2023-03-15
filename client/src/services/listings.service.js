import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const addListings = (model) => {
  axios.post("/api/rentallistings", model).then(() => {
    Swal.fire("Saved successfully;");
  });
};

export const getListings = (cb) => {
  axios.get("/api/rentallistings").then(({ data }) => {
    cb(data);
    console.log(data);
  });
};
