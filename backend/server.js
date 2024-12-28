import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import productRoutes from "./routes/product.route.js"

const app = express()
dotenv.config()
app.use(express.json())

app.use("/api/products", productRoutes)

const PORT = process.env.PORT || 3000

// console.log(process.env.mongo_uri);

app.listen(PORT, () => {
    connectDB()
    console.log(`App is listening to post: ${PORT}`);
})

