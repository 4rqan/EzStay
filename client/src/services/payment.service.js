import axios from "../utils/axios_client";

export const createOrder = async (data) => {
  return await axios.post("/api/payment/createorder", data);
};

export const capturePayment = async (data) => {
  return await axios.post("/api/payment/capture", data);
};
