import express from "express";
import { createOrder, deleteOrder, getOrderDetails, getOrders, getUserOrders, updateOrderStatus } from "../controllers/orders.js";
import { auth, isAdmin } from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post("/create", auth, createOrder);
orderRouter.get("/",  getOrders);
orderRouter.get("/users/:userId", auth, getUserOrders);
orderRouter.get("/:orderId/users/:userId",  getOrderDetails);
orderRouter.put("/:orderId/edit",  updateOrderStatus);
orderRouter.delete("/:orderId/delete", deleteOrder);

export default orderRouter;
