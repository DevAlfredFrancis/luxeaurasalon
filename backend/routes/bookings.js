const express = require('express');
const router = express.Router();
const db = require('../db'); // adjust path if needed

router.post('/api/book', (req, res) => {
  const {
    bookingReference,
    firstName,
    lastName,
    email,
    mobileNumber,
    services,
    date,
    time,
    totalPrice,
    status,
    createdAt
  } = req.body;

  const sql = `
    INSERT INTO bookings 
    (first_name, last_name , email, mobile_number, services, booking_reference, appointment_date, appointment_time, total_price, status, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const serviceNames = Array.isArray(services)
  ? services.map(service => service.services_name)
  : [];

  const servicesString = JSON.stringify(serviceNames);
  console.log("Services received:", services); 
  
  db.query(sql, [
    firstName,
    lastName,
    email,
    mobileNumber,
    servicesString,
    bookingReference,
    date,
    time,
    totalPrice,
    status,
    createdAt
  ], (err, result) => {
    if (err) {
      console.error('Error saving booking:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Booking saved successfully' });
  });
});

module.exports = router;
