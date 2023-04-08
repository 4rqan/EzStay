import Swal from "sweetalert2";
import axios from "../utils/axios_client";

export const getProfile = (cb) => {
  axios.get("/api/profile").then(({ data }) => {
    data.address = data.address || {};
    cb(data);
  });
};

export const updateProfile = (model) => {
  axios.post("/api/profile", model).then(() => {
    Swal.fire("Saved successfully;");
  });
};

export const uploadDp = (file, setImagePath) => {
  const formData = new FormData();
  formData.append("file", file);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    },
  };
  axios
    .post("/api/uploadDp", formData, config)
    .then((response) => {
      Swal.fire("Profile updated successfully!");
      setImagePath(response.data);
    })
    .catch((error) => {
      Swal.fire(error.response.data);
    });
};
