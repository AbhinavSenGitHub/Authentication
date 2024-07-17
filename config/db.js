const mongoose = require("mongoose")
require('dotenv').config()

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGOOSE_URL)
        console.log("Connected to mongooDB")
    }catch(error){
        console.log("MongoDB connection failed:" + error)
        process.exit(1)
    }
}

module.exports = connectDB