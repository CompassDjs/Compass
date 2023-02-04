import Compass from "./compass";
import { apiPing } from "@utils/api";
import * as dotenv from "dotenv";
dotenv.config();

apiPing();
const client = new Compass();

client.login(process.env.TOKEN);
