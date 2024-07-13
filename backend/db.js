const mongoose = require('mongoose');
const dburl = "mongodb://localhost:27017/blogapp"; // Add your database name here
const connectToMongo = async () => {
    try {
        await mongoose.connect(dburl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:");
    }
}
module.exports = connectToMongo;
