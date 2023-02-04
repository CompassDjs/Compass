import axios from "axios";
import { LogApiRes, LogApiError, LogApiPing } from "./logger";
import dotenv from "dotenv";
dotenv.config();

export async function apiPing() {
  let response: any;
  try {
    response = await axios.get(`${process.env.API_URL}/ping`);
    LogApiPing(`api/ping ${response.status} ${response.data}`);
  } catch (_err) {
    LogApiPing(`api/ping ❌`);
    throw new Error("API is not responding");
  }
}

export async function cacheDataToAPI(url: string, cacheData: object) {
  let response: any;
  try {
    response = await axios.put(`${process.env.API_URL}/${url}`, cacheData);
    LogApiRes(`PUT api/${url} ${response.status} ${response.statusText}`);
  } catch (_err) {
    LogApiError(`PUT api/${url} ${response.status} ${response.statusText}`);
  }
}
