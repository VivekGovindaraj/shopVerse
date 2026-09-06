import express from "express";
import { getproducts, createProduct, updateProduct, deleteProduct, getProductById } from "../controllers/productControllers.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

router.route('/')
.get( getproducts )

.post(protect, isAdmin, createProduct)

router.route('/:id')
.get(getProductById)
.put(protect, isAdmin, updateProduct)
.delete(protect, isAdmin, deleteProduct)

export default router