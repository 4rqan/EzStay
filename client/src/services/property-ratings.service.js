import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const addPropertyratings = (model, cb) => {
  axios
    .post("/api//property/addratings", model)
    .then(({ data }) => {
      cb(data);
      Swal.fire("Ratings added successfully");
    })
    .catch(showError);
};

export const getMyPropertyRatings = (id, cb) => {
  axios
    .get("/api/property/getratings/" + id)
    .then(({ data }) => {
      cb(data);
    })
    .catch(showError);
};

export const getAllPropertyRatings = (property, cb) => {
  axios
    .get("/api/property/getallreviews/" + property)
    .then(({ data }) => {
      cb(data);
    })
    .catch(showError);
};
