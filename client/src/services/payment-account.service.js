import Swal from "sweetalert2";
import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const savePaymentAccount = (model) => {
  axios
    .post("/api/paymentAccount", model)
    .then(() => {
      Swal.fire("Saved Successfully");
    })
    .catch(showError);
};

export const getPaymentAccount = (cb) => {
  axios
    .get("/api/paymentAccount")
    .then(({ data }) => {
      cb(data);
    })
    .catch(showError);
};

export const getPaymentAccountByProfileId = (profileId, cb) => {
  axios
    .get("/api/getPaymentAccount/" + profileId)
    .then(({ data }) => {
      cb(data);
    })
    .catch(showError);
};
