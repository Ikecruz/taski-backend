import { config } from "dotenv";
config();

export const CREDENTIALS = process.env.CREDENTIALS === "true";
export const {
  NODE_ENV,
  PORT,
  JWT_SECRET_KEY,
  JWT_EXPIRES_IN,
  LOG_FORMAT,
  LOG_DIR,
  ORIGIN,
  SECRET_KEY
} = process.env;