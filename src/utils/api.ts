import axios from "axios";
import { LogApiRes, LogApiError, LogApiPing, LogApiReq } from "./logger";
import dotenv from "dotenv";
import { Wait } from "@utils/functions";
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

let requestCount = 0;
export async function sendDataToAPI(
  url: string,
  method: string,
  cacheData: any
) {
  try {
    await Wait(1000 * ++requestCount);
    if (requestCount > 0) requestCount = 0;

    let response =
      method === "put"
        ? await axios.put(`${process.env.API_URL}/${url}`, cacheData)
        : await axios.post(`${process.env.API_URL}/${url}`, cacheData);
    LogApiReq(
      `${method.toUpperCase()} api/${url} ${response.status} ${
        response.statusText
      }`
    );
  } catch (error: any) {
    LogApiError(
      `${method.toUpperCase()} api/${url} ${error.response.status} ${
        error.response.statusText
      }`
    );
  }
}

export async function deleteDataFromAPI(url: string) {
  let response: any;
  try {
    response = await axios.delete(`${process.env.API_URL}/${url}`);
    LogApiRes(`DELETE api/${url} ${response.status} ${response.statusText}`);
  } catch (_err) {
    LogApiError(
      `DELETE api/${url} ${response?.status} ${response?.statusText}`
    );
  }
}

export async function getDataFromAPI(url: string) {
  let response: any;
  try {
    response = await axios.get(`${process.env.API_URL}/${url}`);
    LogApiRes(`GET api/${url} ${response.status} ${response.statusText}`);
    return response.data;
  } catch (_err) {
    LogApiError(`GET api/${url} ${response?.status} ${response?.statusText}`);
    return null;
  }
}
