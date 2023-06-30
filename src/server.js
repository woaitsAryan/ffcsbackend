const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const jwtSecretToken = 'CSI-is-the-best';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(token, jwtSecretToken, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
}

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Define a schema for the user data
    const userSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      passwordHash: { type: String, required: true },
    });

    // Define a model based on the schema
    const User = mongoose.model('User', userSchema);

    app.post('/register', authenticateToken, (req, res) => {
      let { username, password } = req.body;
      username = username.trim();
      password = password.trim();

      if (!validator.isAlphanumeric(username)) {
        return res.status(400).json({ error: 'Username must be alphanumeric' });
      }

      if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0, returnScore: false })) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least 1 number' });
      }

      User.findOne({ username })
        .then((existingUser) => {
          if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
          }

          bcrypt.hash(password, 10)
            .then((hashedPassword) => {
              const newUser = new User({ username, passwordHash: hashedPassword });
              newUser.save()
                .then(() => {
                  const token = jwt.sign({ message: 'User created successfully' }, jwtSecretToken, { expiresIn: '10h' });
                  return res.json({ token });
                })
                .catch((error) => {
                  console.error(error);
                  return res.status(500).json({ error: 'Internal Server Error' });
                });
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).json({ error: 'Internal Server Error' });
            });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        });
    });

    app.post('/login', authenticateToken, (req, res) => {
      let { username, password } = req.body;
      username = username.trim();
      password = password.trim();

      User.findOne({ username })
        .then((user) => {
          if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
          }

          bcrypt.compare(password, user.passwordHash)
            .then((result) => {
              if (result) {
                const token = jwt.sign({ message: 'Login successful' }, jwtSecretToken, { expiresIn: '10h' });
                return res.json(token);
              } else {
                return res.status(400).json({ error: 'Invalid username or password' });
              }
            })
            .catch((error) => {
              console.error(error);
              return res.status(500).json({ error: 'Internal Server Error' });
            });
        })
        .catch((error) => {
          console.error(error);
          return res.status(500).json({ error: 'Internal Server Error' });
        });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = app;