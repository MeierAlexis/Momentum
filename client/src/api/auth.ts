import axios from "axios";
import { UserLogin, UserRegister } from "../interfaces/auth";
const API = "http://localhost:3000/api";

export const registerRequest = (user: UserRegister) =>
  axios.post(`${API}/register`, user);

export const loginRequest = (user: UserLogin) =>
  axios.post(`${API}/login`, user);
