import express from "express";
import { createProduct, deleteProduct, getProductDetails, listProduct, updateProduct } from "../controllers/products.js";
import { auth, isAdmin } from "../middleware/auth.js";

const productRouter = express.Router();

productRouter.post("/create", auth, isAdmin, createProduct);
productRouter.get("/", listProduct);
productRouter.get("/:productId", getProductDetails);
productRouter.put("/:productId/edit", auth, isAdmin, updateProduct);
productRouter.delete("/:productId/delete", auth, isAdmin, deleteProduct);

export default productRouter;
