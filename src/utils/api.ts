import axios from "axios";
import { LogApiRes, LogApiError, LogApiReq } from "./logger";
import dotenv from "dotenv";
import { Wait } from "@utils/functions";
dotenv.config();

export async function apiPing() {
  try {
    await axios.get(`${process.env.API_URL}/ping`);
    return true;
  } catch (_err) {
    return false;
  }
}

let requestCount = 0;
export async function sendDataToAPI(
  url: string,
  method: string,
  cacheData: any
) {
  if (!(await apiPing())) return;
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
  if (!(await apiPing())) return;
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
  if (!(await apiPing())) return null;
  try {
    response = await axios.get(`${process.env.API_URL}/${url}`);
    LogApiRes(`GET api/${url} ${response.status} ${response.statusText}`);
    return response.data;
  } catch (_err) {
    LogApiError(`GET api/${url} ${response?.status} ${response?.statusText}`);
    return null;
  }
}
