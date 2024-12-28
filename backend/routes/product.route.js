import express from "express"
import { 
    getAllProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct } from "../controllers/product.controller.js"

const productRoutes = express.Router()

productRoutes.post("/", createProduct)
productRoutes.get("/", getAllProducts)
productRoutes.delete("/:id", deleteProduct)
productRoutes.put("/:id", updateProduct)

export default productRoutes
