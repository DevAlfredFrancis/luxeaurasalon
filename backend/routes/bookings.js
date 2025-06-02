const express = require('express');
const router = express.Router();
const db = require('../db'); 

// insert data to database at bookings table
router.post('/', (req, res) => {
  const {
    firstName,
    lastName,
    email,
    mobileNumber,
    services,
    duration,
    bookingReference,
    appointment_datetime,
    totalPrice,
    status,
    createdAt
  } = req.body;

  const sql = `
    INSERT INTO bookings 
    (first_name, last_name , email, mobile_number, services, duration, booking_reference, appointment_datetime, total_price, status, created_at) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
    duration,
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

//get data from database
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT id, first_name, last_name, mobile_number, appointment_datetime, services ,duration, booking_reference, total_price, status
      FROM bookings
    `);

    const events = rows.map(booking => {
      const startDateTime = new Date(booking.appointment_datetime);
      const endDateTime = new Date(startDateTime.getTime() + (booking.duration || 60) * 60 * 1000); // plus total services duration
      

      let serviceNames = [];
      try {
        const parsedServices = JSON.parse(booking.services);
        serviceNames = Array.isArray(parsedServices) ? parsedServices.map(s => s.name || s) : [];
      } catch (e) {
        console.error('Error parsing services:', e);
        serviceNames = ['Unknown'];
      }

      return {
        id: booking.id,
        title: `${booking.first_name} ${booking.last_name}`,
        contact: booking.mobile_number,
        services: `${serviceNames.join(', ')}`,
        status: booking.status,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        bookingRef: booking.booking_reference,
        totalPrice: booking.total_price,
        class: booking.status
      };
    });

    res.json(events);
  } catch (err) {
    console.error('Error fetching bookings:', err);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// update booking status by ID
router.put('/:id/status', async (req, res) => {
  const bookingId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Status is required' });
  }

  try {
    const [result] = await db.promise().query(
      'UPDATE bookings SET status = ? WHERE id = ?',
      [status, bookingId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking status updated successfully' });
  } catch (err) {
    console.error('Error updating booking status:', err);
    res.status(500).json({ error: 'Database error while updating status' });
  }
});

module.exports = router;
