
import express from "express";
import { createOrder, getAllOrders, getMyOrders, getOrdersById, updateOrderStatus } from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
.post(protect, createOrder)
.get(protect, isAdmin, getAllOrders);

router.route("/myorders").get(protect, getMyOrders)
router.route("/:id").get(protect, getOrdersById)
router.route("/:id/status").put(protect, isAdmin, updateOrderStatus)
export default router;