import Compass from "./compass";
import { apiPing } from "@utils/api";
import { LogApiPing } from "@utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

async function isApiOn() {
  try {
    await apiPing();
    LogApiPing(`api/ping ✅`);
  } catch (error) {
    LogApiPing(`api/ping ❌`);
    throw new Error("API is not responding");
  }
}
isApiOn();

const client = new Compass();

client.login(process.env.TOKEN);
