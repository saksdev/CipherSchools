const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const uri =
            process.env.MONGODB_URI ||
            process.env.MONGODB_URL ||
            process.env.MONGODB_URT ||
            process.env.MONGO_URI ||
            process.env.MONGO_URL;

        if (!uri) {
            throw new Error('MongoDB connection string (MONGODB_URI) is not defined in environment variables.');
        }

        await mongoose.connect(uri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database connection error:', err.message);
        // Don't exit process in production so we can see 500 errors or health check failures instead of infinite crashes
        if (process.env.NODE_ENV !== 'production') {
            process.exit(1);
        }
    }
};

module.exports = connectDB;
