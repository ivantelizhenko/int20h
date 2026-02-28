import dotenv from "dotenv";

dotenv.config();

export const getEnvVar = (startValue, defaultValue) => {
  const value = process.env[startValue];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing ${value} in your .env file`);
};
