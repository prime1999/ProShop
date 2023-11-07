import express from "express";
import {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
} from "../controllers/ProductController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);

router.post("/", protect, admin, createProduct);

router.get("/:id", getProductById);

router.put("/:id", protect, admin, updateProduct);

export default router;