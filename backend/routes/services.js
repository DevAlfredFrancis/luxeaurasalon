// routes/services.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Insert new service
router.post('/', (req, res) => {
  const { 
    services_name, 
    category,
    description, 
    duration_minutes, 
    price 
  } = req.body;

  const sql = `
    INSERT INTO services (services_name, category, description, duration_minutes, price)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    services_name, 
    category, 
    description, 
    duration_minutes, 
    price
  ], (err, result) => {
    if (err) {
      console.error('Error inserting service:', err);
      return res.status(500).json({ error: 'Database error inserting service' });
    }

    res.status(201).json({ message: 'Service added successfully' });
  });
});

// Get all services
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM services');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching services:', err);
    res.status(500).json({ error: 'Database error fetching services' });
  }
}); 

// Update existing service
router.put('/:id', (req, res) => {
  const { services_name, category, description, duration_minutes, price } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE services
    SET services_name = ?, category = ?, description = ?, duration_minutes = ?, price = ?
    WHERE id = ?
  `;

  db.query(sql, [
    services_name,
    category,
    description,
    duration_minutes,
    price,
    id
  ], (err, result) => {
    if (err) {
      console.error('Error updating service:', err);
      return res.status(500).json({ error: 'Database error updating service' });
    }

    res.json({ message: 'Service updated successfully' });
  });
});


// Delete service by ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const sql = 'DELETE FROM services WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting service:', err);
      return res.status(500).json({ error: 'Database error deleting service' });
    }

    res.json({ message: 'Service deleted successfully' });
  });
});


module.exports = router;
