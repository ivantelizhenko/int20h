import { Sequelize } from "sequelize";
import { getEnvVar } from "../../utils/getEnvVar.js";
import { baseConfig } from "./baseSequelizeConfig.js";

const serverSequelize = new Sequelize({
  ...baseConfig,
  database: "postgres",
});

export const sequelize = new Sequelize({
  ...baseConfig,
});

export async function databaseInit() {
  try {
    await serverSequelize.authenticate();
    console.log("✅ Connection to database server successful.");
    await serverSequelize
      .query(`CREATE DATABASE "${baseConfig.database}"`)
      .catch((err) => {
        if (err.original?.code === "42P04") {
          console.log(`✅ Database '${baseConfig.database}' already exists.`);
        } else {
          throw err;
        }
      });

    await sequelize.authenticate();
    console.log("✅ Connection to application database successful.");

    await sequelize.sync({ alter: true });
    console.log("✅ Tables synchronized successfully.");
    console.log(
      "✅ Tables synchronized successfully. Models:",
      Object.keys(sequelize.models),
    );
  } catch (err) {
    console.log("❌ Database initialization error:", err);
    throw err;
  }
}
