import axios from "./axios";

export const createPaymentBasicPlanRequest = () =>
  axios.post("/create-payment-basic-plan");
export const createPaymentProPlanRequest = () =>
  axios.post("/create-payment-pro-plan");
export const createPaymentPremiumPlanRequest = () =>
  axios.post("/create-payment-premium-plan");
