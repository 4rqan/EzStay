import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const saveFeedback = (data, cb) => {
  axios
    .post("/api/feedback", data)
    .then(({ data }) => {
      cb(data);
      Swal.fire("Feedback Added successfully");
    })
    .catch(showError);
};

export const getAllFeedbacks = (cb, params) => {
  axios.get("/api/feedbacks", { params }).then(({ data }) => {
    cb(data);
  });
};
