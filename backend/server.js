const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Fire up database connection
connectDB();

// Middleware modules
app.use(cors());
app.use(express.json());

// Bind the router modules matching your setup
app.use('/api/todos', require('./routes/todoRoutes'));

// Basic health check route
app.get('/', (req, res) => res.send('API running successfully'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));