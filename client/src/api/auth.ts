import { UserLogin, UserRegister } from "../interfaces/auth";

import axios from "./axios";
export const registerRequest = (user: UserRegister) =>
  axios.post(`/register`, user);

export const loginRequest = (user: UserLogin) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get(`/verify-token`);
