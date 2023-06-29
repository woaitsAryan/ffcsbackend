const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
var validator = require('validator');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('db/database.db');

app.post('/register', (req, res) => {
  var { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  if (!validator.isAlphanumeric(username)) {
    res.status(401).json({ error: 'Username must be alphanumeric' });
  }
  if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0, returnScore: false})) {
    res.status(402).json({ error: 'Password must be at least 8 characters long and contain at least 1 number' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(501).json({ error: 'Internal Server Error' });
    } else if (row) {
      res.status(402).json({ error: 'Username already exists' });
    } else {

        bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          res.status(503).json({ error: 'Internal Server Error' });
        } else {
          db.run('INSERT INTO users (username, passwordhash) VALUES (?, ?)', [username, hashedPassword], function(err) {
            if (err) {
              console.error(err);
              res.status(504).json({ error: 'Internal Server Error' });
            } else {
              res.json({ message: 'User created successfully' });
            }
          });
        }
      });
    }
  });
});

app.post('/login', (req, res) => {
  var { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  
  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      res.status(505).json({ error: 'Internal Server Error' });
    } else if (!row) {
      res.status(406).json({ error: 'Invalid username or password' });
    } else {
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          console.error(err);
          res.status(507).json({ error: 'Internal Server Error' });
        } else if (result) {
          res.json({ message: 'Login successful' });
        } else {
          res.status(408).json({ error: 'Invalid username or password' });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
