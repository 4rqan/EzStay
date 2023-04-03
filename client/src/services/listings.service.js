import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { objectToFormData } from "../utils/utils";

export const addListings = (model, navigate) => {
  const formdata = objectToFormData(model);
  axios.post("/api/rentallistings", formdata).then(({ data }) => {
    Swal.fire("Saved successfully;");
    navigate("/landlord/rentalListings/" + data._id);
  });
};

export const getListings = (cb) => {
  axios.get("/api/rentallistings").then(({ data }) => {
    cb(data);
    console.log(data);
  });
};

export const getRentalDetails = (id, cb) => {
  axios.get("/api/rentallistings/" + id).then(({ data }) => {
    cb(data);
  });
};

export const getAllListings = (
  cb,
  page = 1,
  pageSize = 6,
  sortField = "title",
  sortOrder = "asc"
) => {
  axios
    .get("/api/allListings", {
      params: { page, pageSize, sortField, sortOrder },
    })
    .then(({ data }) => {
      cb(data);
    });
};
