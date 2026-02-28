import { asyncHandler } from "../utils/asyncHandler.js";
import {
  getAllOrdersService,
  createOrderService,
  importOrdersService,
} from "../services/orderService.js";

export const showAllOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const { page: _p, limit: _l, ...filters } = req.query;
  const orders = await getAllOrdersService({ page, limit, filters });
  return res.status(200).json({
    message: "Orders found successfully",
    data: orders,
  });
});

export const createOrder = asyncHandler(async (req, res) => {
  const payload = req.body;
  const newOrder = await createOrderService(payload);
  return res.status(201).json({
    message: "Order created successfully",
    data: newOrder,
  });
});

export const importOrders = asyncHandler(async (req, res) => {
  const csvData = req.csvData;
  if (!csvData || csvData.length === 0) {
    return res.status(400).json({ message: "CSV empty or not loaded" });
  }
  await importOrdersService(csvData);

  return res.status(200).json({ message: "CSV imported successfully" });
});
