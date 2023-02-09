import Compass from "./compass";
import { apiPing } from "@utils/api";
import { LogApiPing } from "@utils/logger";
import * as dotenv from "dotenv";
dotenv.config();

(async () => {
  if (await apiPing()) LogApiPing(`api/ping ✅`);
  else {
    LogApiPing(`api/ping ❌`);
    throw new Error("API is not responding");
  }
})();

const client = new Compass();

client.login(process.env.TOKEN);
