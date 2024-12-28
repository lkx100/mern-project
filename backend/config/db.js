import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MondoDB connection: ${connect.connection.host}`)
    }
    catch (error) {
        console.log(`${error.message}`)
        process.exit(1)   // 1: fail, 0: success
    }
}

export default connectDB
