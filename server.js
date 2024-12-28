const express = require('express');
const http = require('http');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const documentRoutes = require('./routes/documents');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json()); // Middleware to parse JSON bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);

// Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});