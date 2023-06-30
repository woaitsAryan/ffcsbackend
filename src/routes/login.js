import express from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envHandler from '../helpers/envHandler.js';


const login = express.Router();

login.post('/login', (req, res) => {
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
              const token = jwt.sign({ message: 'Login successful' }, envHandler('JWTSecret'), { expiresIn: '10h' });
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

export default login;