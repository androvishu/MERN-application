const mongoose = require("mongoose");

const connectDB = async(uri) => {
    try {
        mongoose.set('strictQuery', false);
        const con = await mongoose.connect(uri)
    } catch (err) { 
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;

