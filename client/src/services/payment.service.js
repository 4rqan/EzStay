import axios from "../utils/axios_client";

export const createServiceOrder = async (data) => {
  return await axios.post("/api/service/payment/createorder", data);
};

export const captureServicePayment = async (data) => {
  return await axios.post("/api/service/payment/capture", data);
};

export const createPropertyOrder = async (data) => {
  return await axios.post("/api/property/payment/createorder", data);
};

export const capturePropertyPayment = async (data) => {
  return await axios.post("/api/property/payment/capture", data);
};
