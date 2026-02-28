import { Router } from "express";
import {
  showAllOrders,
  createOrder,
  importOrders,
} from "../controllers/orderController.js";
import multerCsvMiddleware from "../middlewares/multerCsv.js";

const router = Router();

router.get("/", showAllOrders);
router.post("/", createOrder);
router.post("/import", multerCsvMiddleware("file"), importOrders);

export default router;
