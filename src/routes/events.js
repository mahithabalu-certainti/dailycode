const express = require('express');
const router = express.Router();
const pool = require('../db/pool');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events ORDER BY event_date ASC');
    res.json({ success: true, data: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, venue, event_date, price, total_seats } = req.body;
    if (!title || !venue || !event_date || !total_seats) {
      return res.status(400).json({ success: false, message: 'title, venue, event_date, total_seats are required' });
    }
    const result = await pool.query(
      `INSERT INTO events (title, description, venue, event_date, price, total_seats)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [title, description, venue, event_date, price || 0, total_seats]
    );
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
