import axios from "./axios";
import { WheelOfLifeData } from "../interfaces/WheelOfLifeData";

export const getWheelRequest = () => axios.get(`/wheel`);

export const updateWheelRequest = (WheelData: WheelOfLifeData) =>
  axios.put(`/wheel`, WheelData);

export const createWheelRequest = (WheelData: WheelOfLifeData) =>
  axios.post(`/wheel`, WheelData);
