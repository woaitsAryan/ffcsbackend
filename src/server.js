const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bcrypt = require('bcrypt');
var validator = require('validator');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./db/database.db');

app.post('/register', (req, res) => {
  var { username, password } = req.body;
  username = username.trim();
  password = password.trim();
  if (!validator.isAlphanumeric(username)) {
   return res.status(401).json({ error: 'Username must be alphanumeric' });
  }
  if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0, returnScore: false})) {
    return res.status(402).json({ error: 'Password must be at least 8 characters long and contain at least 1 number' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(501).json({ error: 'Internal Server Error' });
    } else if (row) {
      return res.status(402).json({ error: 'Username already exists' });
    } else {

        bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          return res.status(503).json({ error: 'Internal Server Error' });
        } else {
          db.run('INSERT INTO users (username, passwordhash) VALUES (?, ?)', [username, hashedPassword], function(err) {
            if (err) {
              console.error(err);
              return res.status(504).json({ error: 'Internal Server Error' });
            } else {
              return res.json({ message: 'User created successfully' });
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
    console.log(row)
    if (err) {
      console.error(err);
      return res.status(505).json({ error: 'Internal Server Error' });
    } else if (!row) {
      return res.status(406).json({ error: 'Invalid username or password' });
    } else {
      bcrypt.compare(password, row.passwordhash, (err, result) => {
        if (err) {
          console.error(err);
          return res.status(507).json({ error: 'Internal Server Error' });
        } else if (result) {
          return res.json({ message: 'Login successful' });
        } else {
          return res.status(408).json({ error: 'Invalid username or password' });
        }
      });
    }
  });
});

module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
