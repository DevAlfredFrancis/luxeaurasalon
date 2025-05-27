const express = require('express');
const router = express.Router();
const db = require('../db'); 

// send data to database
router.post('/book', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    services,
    bookingReference,
    appointment_datetime,
    totalPrice,
    status,
    createdAt
  } = req.body;

  const sql = `
    INSERT INTO bookings 
    (first_name, last_name , email, mobile_number, services, booking_reference, appointment_datetime, total_price, status, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const serviceNames = Array.isArray(services)
  ? services.map(service => service.services_name)
  : [];

  const servicesString = JSON.stringify(serviceNames);
  console.log("Services received:", services); 

  function formatToMySQLDateTime(isoString) {
    const date = new Date(isoString);
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  }

  const formattedAppointmentDatetime = formatToMySQLDateTime(appointment_datetime,);

  db.query(sql, [
    firstName,
    lastName,
    email,
    mobileNumber,
    servicesString,
    bookingReference,
    formattedAppointmentDatetime,
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

//receive data from database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT first_name, last_name, appointment_datetime, services ,status
      FROM bookings
    `);

    const events = rows.map(booking => {
      const startDateTime = new Date(booking.appointment_datetime);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // +1 hour

      let serviceNames = [];
      try {
        const parsedServices = JSON.parse(booking.services);
        serviceNames = Array.isArray(parsedServices) ? parsedServices.map(s => s.name || s) : [];
      } catch (e) {
        console.error('Error parsing services:', e);
        serviceNames = ['Unknown'];
      }

      return {
        title: `${booking.first_name} ${booking.last_name}`,
        services: `${serviceNames.join(', ')}`,
        status: booking.status,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        class: booking.status
      };
    });

    res.json(events);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});


module.exports = router;
