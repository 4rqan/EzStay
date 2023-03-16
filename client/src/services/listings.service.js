import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const addListings = (model, images) => {
  const formdata = new FormData();
  formdata.append("title", model.title);
  formdata.append("description", model.description);
  formdata.append("propertyType", model.propertyType);
  formdata.append("location", model.location);
  formdata.append("price", model.price);
  formdata.append("bedrooms", model.bedrooms);
  formdata.append("bathrooms", model.bathrooms);
  formdata.append("availableDate", model.availableDate);

  for (let i = 0; i < images.length; i++) {
    formdata.append("files", images[i]);
  }
  axios.post("/api/rentallistings", formdata).then(() => {
    Swal.fire("Saved successfully;");
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
