// server.js

require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3000; // Default to 3000 if PORT is not set in .env

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/bookings', bookingRoutes);

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

// Example route to test connection
app.get('/api/data', (req, res) => {
  db.query('SELECT * FROM services', (err, results) => {
    if (err) {
      console.error('Query error: ', err);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
