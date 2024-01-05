const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  //database: 'user',
  waitForConnections: true,
  connectionLimit: 10, // Adjust as needed
  queueLimit: 0
});

// Get a connection from the pool
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to MySQL database!');

  // Perform operations with the connection
  connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
    if (error) {
      console.error('Error executing query:', error);
      connection.release(); // Release the connection
      return;
    }

    console.log('The solution is: ', results[0].solution);

    // Release the connection when done
    connection.release();
  });
});





app.post("/database",async (req, res) => { // 
    // Create Database
    connection.query('CREATE DATABASE IF NOT EXISTS users', (err) => {
      if (err) {
        console.error('Error creating database:', err);
        res.status(500).send('Error creating database');
        return;
      }
      console.log('Database created or already exists');
      
      // Use the created database
      connection.query('USE users', (err) => {
        if (err) {
          console.error('Error selecting database:', err);
          res.status(500).send('Error selecting database');
          return;
        }
        console.log('Using database: users');
        res.status(200).send('Database created and selected');
      });
    });
  });
  
  app.post("/table", (req, res) => {
    // Create Table (Example: Users table)
    connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err);
        res.status(500).send('Error creating table');
        return;
      }
      console.log('Table created or already exists');
      res.status(200).send('Table created or already exists');
    });
  });
  
  app.post("/add-user", (req, res) => {
    const { name } = req.body;
  
    // Insert a user using a parameterized query
    connection.query(
      'INSERT INTO users (name) VALUES (?)',
      [name],
      (err, results) => {
        if (err) {
          console.error('Error inserting record:', err);
          res.status(500).send('Error inserting record');
          return;
        }
        console.log('Record inserted:', results);
        res.status(200).send('Record inserted');
      }
    );
  });
  
  app.get("/one-user/:id", (req, res) => {
    const userId = req.params.id;
  
    // Retrieve a user by ID
    connection.query(
      'SELECT * FROM users WHERE id = ?',
      [userId],
      (err, results) => {
        if (err) {
          console.error('Error fetching user:', err);
          res.status(500).send('Error fetching user');
          return;
        }
        if (results.length === 0) {
          res.status(404).send('User not found');
          return;
        }
        const user = results[0];
        res.status(200).json(user);
      }
    );
   });
   app.listen(5000);