import Product from "../models/product.model.js"
import mongoose from "mongoose"

export const createProduct = async (req, res) => {
    // const product = req.body   // User will send this data as a body
    const { name, price, image } = req.body  // Destructuring product data from body

    if (!name) return res.status(400).send("Missing Name field")
    if (!price) return res.status(400).send("Missing Price field")
    if (typeof price !== 'number' || price <= 0) return res.status(400).send("Invalid Price field")

    const newProduct = new Product({ name, price, image }) 

    try {
        await newProduct.save()
        return res.status(201).json({ success: true, message: "Product Created Successfully" })
    } 
    catch (error) {
        console.log(`Error Occured: ${error.message}`);
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const updateProduct = async (req, res) => {
    // const product = req.body   // User will send this data as a body
    const { id } = req.params
    const { name, price, image } = req.body  // Destructuring product data from body

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Product ID" })

    if (!name) return res.status(400).send("Missing Name field")
    if (!price) return res.status(400).send("Missing Price field")
    if (typeof price !== 'number' || price <= 0) return res.status(400).send("Invalid Price field")

    try {
        const updateProduct = await Product.findByIdAndUpdate(
            id, 
            { name, price, image }, 
            { new: true, runValidators: true }
        )

        if (!updateProduct) res.status(404).json({ success: false, message: `Product with ID: ${id} not found` })

        return res.status(201).json({ success: true, message: "Product Updated Successfully", product: {name, price, image} })
    } 
    catch (error) {
        console.log(`Error Occured: ${error.message}`);
        return res.status(500).json({ status: false, message: "Server Error" })
    }
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid Product ID" })

    try {
        const productToDelete = await Product.findByIdAndDelete(id)

        if (!productToDelete) return res.status(404).json({ success: false, message: `Product with ID: ${id} not found` })
        else return res.status(200).json({ success: true, message: `Deleted Product \"${productToDelete.name}\"!` })
    }
    catch (error) {
        console.log(`Error Occurred: ${error.message}`)
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        
        if (products.length == 0) return res.status(200).json({ success: true, message: "Empty List", data: [] })
        return res.status(200).json({ success: true, data: products })
    }
    catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({ success: false, message: "Server Error" })
    }
}
