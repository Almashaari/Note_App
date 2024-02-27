const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "keeper-database",
    password: "123123",
    port: 5432,
});

app.get('/api/notes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM notes ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching notes:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  try {
    await pool.query('INSERT INTO notes (title, content) VALUES ($1, $2)', [title, content]);
    res.status(201).json({ message: 'Note added successfully' });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notes WHERE id = $1', [id]);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error('Error deleting note:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


