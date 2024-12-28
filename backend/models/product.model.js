import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
    },
}, {
    timestamps: true  // createdAt, updatedAt fields
})

const Product = mongoose.model("Product", productSchema)   // "Product" --> "products"

export default Product
