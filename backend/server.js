// server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');
const serviceRoutes = require('./routes/services');

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);
app.use('/api/services', serviceRoutes);

// MySQL connection setup
const db = require('./db'); 

// Connect to MySQL
db.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
