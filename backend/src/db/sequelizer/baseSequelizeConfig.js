import { getEnvVar } from "../../utils/getEnvVar.js";

const dbHost = getEnvVar("DB_HOST");
const dbName = getEnvVar("DB_NAME");
const dbPort = getEnvVar("DB_PORT");
const dbDialect = getEnvVar("DB_DIALECT", "postgres");
const dbPassword = getEnvVar("DB_PASSWORD");
const dbUser = getEnvVar("DB_USER");

export const baseConfig = {
  dialect: dbDialect,
  username: dbUser,
  port: dbPort,
  host: dbHost,
  password: dbPassword,
  database: dbName,
};
