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

export async function sendDataToAPI(
  url: string,
  method: string,
  cacheData: object
) {
  try {
    let response =
      method === "put"
        ? await axios.put(`${process.env.API_URL}/${url}`, cacheData)
        : await axios.post(`${process.env.API_URL}/${url}`, cacheData);
    LogApiRes(
      `${method.toUpperCase()} api/${url} ${response.status} ${
        response.statusText
      }`
    );
  } catch (_err) {
    console.log(_err);
    LogApiError(`${method.toUpperCase()} api/${url} `);
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
