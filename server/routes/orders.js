import express from "express";
import { createOrder, deleteOrder, getOrderDetails, getOrders, getUserOrders, updateOrderStatus } from "../controllers/orders.js";
import { auth, isAdmin } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", auth, createOrder);
orderRouter.get("/", auth, isAdmin, getOrders);
orderRouter.get("/users/:userId", auth, getUserOrders);
orderRouter.get("/:orderId/users/:userId", auth, getOrderDetails);
orderRouter.put("/:orderId/edit", auth, isAdmin, updateOrderStatus);
orderRouter.delete("/:orderId/delete", auth, isAdmin, deleteOrder);

export default orderRouter;
