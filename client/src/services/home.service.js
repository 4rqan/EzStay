import axios from "../utils/axios_client";
import { showError } from "../utils/utils";

export const search = (searchText, cb) => {
  axios
    .get("/api/search?searchText=" + searchText)
    .then(({ data }) => cb(data))
    .catch(showError);
};
