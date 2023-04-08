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

export const deleteListing = (id, cb) => {
  axios
    .delete("/api/rentallistings/" + id)
    .then(({ data }) => {
      Swal.fire("Deleted Successfully");
      cb();
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const getListings = (cb) => {
  axios.get("/api/rentallistings").then(({ data }) => {
    cb(data);
  });
};

export const getRentalDetails = (id, cb, setDefaultValues) => {
  axios.get("/api/rentallistings/" + id).then(({ data }) => {
    cb(data);
    setDefaultValues(data);
  });
};

export const updateListing = (model, cb) => {
  axios
    .put("/api/rentallistings", model)
    .then(({ data }) => {
      Swal.fire("Updated successfully");
      cb(data);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const deleteImage = (propertyId, imageId, cb) => {
  axios
    .delete("/api/rentallistings/images/" + propertyId + "/" + imageId)
    .then(({ data }) => {
      Swal.fire("Updated successfully");
      cb(data);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
    });
};

export const addImage = (propertyId, file, cb) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("id", propertyId);
  axios
    .post("/api/rentallistings/images", formData)
    .then(({ data }) => {
      Swal.fire("Updated successfully");
      cb(data);
    })
    .catch(({ response }) => {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: response.data,
      });
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
