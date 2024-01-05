const express = require('express');
const cors = require("cors");         // cross orient resource sharing
const mysql = require('mysql2');

const app = express();                 // create express object
app.use(express.json());
app.use(cors());

// Create a MySQL connection pool
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'users'
  });
  
  connection.connect(err => {
    if (err) {
      console.error('Error connecting to database:', err);
      return;
    }
    console.log('Connected to MySQL database');
  });
  
  // Retrieve all strings
  app.get('/view', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
      if (err) {
        console.error('Error fetching strings:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.json(results);
    });
  });
  
  // Retrieve string by ID
  app.get('/viewone/:id', (req, res) => {
    const  id  = req.params.id;
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error fetching string by ID:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      if (results.length === 0) {
        res.status(404).send('String not found');
        return;
      }
      res.json(results[0]);
    });
  });
  
  // Create a new string
  app.post('/newupdate', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).send('Name is required');
      }
    connection.query('INSERT INTO users (name) VALUES (?)', [name], (err, results) => {
      if (err) {
        console.error('Error creating new string:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(201).send('String created successfully');
    });
  });
  
  // Update string by ID
  app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    connection.query('UPDATE users SET name = ? WHERE id = ?', [name, id], (err, results) => {
      if (err) {
        console.error('Error updating string:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('String updated successfully');
    });
  });
  
  // Delete string by ID
  app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
      if (err) {
        console.error('Error deleting string:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      res.status(200).send('String deleted successfully');
    });
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });