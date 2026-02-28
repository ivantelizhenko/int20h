import express from "express";
import { databaseInit } from "./db/sequelizer/sequelizer.js";
import { getEnvVar } from "./utils/getEnvVar.js";
import cors from "cors";
import orderRoutes from "./routes/orderRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundRouteHandler } from "./middlewares/notFoundRouteHandler.js";
import { Order } from "./db/models/OrderModel.js";

const app = express();

const PORT = Number(getEnvVar("PORT", 3000));

app.use(express.json());
app.use(cors());

async function startServer(req, res) {
  try {
    await databaseInit();
    console.log("✅ Database successfully initialized");
  } catch (err) {
    console.error(
      "❌ Failed to start the server: Database initialization error.",
      err,
    );
  }
}

// Routes

app.use("/api/orders", orderRoutes);

// Middleware handlers
app.use(errorHandler);
app.use(notFoundRouteHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startServer();
