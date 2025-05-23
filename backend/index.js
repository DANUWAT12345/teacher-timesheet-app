const express = require('express');
const app = express();
const port = 5000; // You can choose any available port
const { Client } = require('pg');

app.get('/', (req, res) => {
  res.send('Teacher Timesheet Backend');
});

// Configure PostgreSQL client using environment variables
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

client.connect();

// API endpoint to get all teachers
app.get('/api/teachers', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM teachers');
    res.json(result.rows);
  } catch (err) {
    console.error('Error executing query', err);
    res.status(500).send('Error retrieving teachers');
  }
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
