const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
const connectDB = require('./config/mongodb');
const assignmentRoutes = require('./routes/assignments');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(helmet({
    contentSecurityPolicy: false // Disable CSP temporarily for easier cross-origin debugging
}));

app.use(cors()); // Allow all origins temporarily for debugging
app.use(express.json());

// Request logging for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Routes
app.use('/api/assignments', assignmentRoutes);

// Health check
app.get('/health', (req, res) => res.json({ status: 'UP', env: process.env.NODE_ENV }));

const PORT = process.env.PORT || 5000;
if (require.main === module) {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
