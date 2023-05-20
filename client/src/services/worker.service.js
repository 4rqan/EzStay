import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const saveWorkerDetails = (model, cb) => {
  axios.post("/api/worker", model).then(({ data }) => {
    Swal.fire("Saved successfully");
    cb(data);
  });
};

export const getWorkerDetails = (cb) => {
  axios.get("/api/worker").then(({ data }) => {
    cb(data);
  });
};

export const getServices = (cb) => {
  axios.get("/api/services").then(({ data }) => {
    cb(data);
  });
};

export const getAllServices = (cb) => {
  axios.get("/api/all/services").then(({ data }) => {
    cb(data);
  });
};

export const getServicesBySkill = (skill, cb) => {
  axios.get("/api/services/" + skill).then(({ data }) => {
    cb(data);
  });
};

export const getWorkerDetailsById = (id, cb) => {
  axios.get("/api/workerdetails/" + id).then(({ data }) => {
    cb(data);
  });
};

export const uploadCoverPic = (file, setImagePath) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .post("/api/worker/image", formData, config)
    .then((response) => {
      Swal.fire("Image updated successfully!");
      setImagePath(response.data);
    })
    .catch((error) => {
      Swal.fire(error.response.data);
    });
};
