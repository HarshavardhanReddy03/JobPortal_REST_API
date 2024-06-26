const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
    }
}

module.exports = connectDB;