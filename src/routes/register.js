import express from 'express';
import mongoose from 'mongoose';
import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envHandler from '../helpers/envHandler.js';

const register = express.Router();

register.post('/', (req, res) => {
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
                  const token = jwt.sign({ message: 'User created successfully' }, envHandler('JWTSecret'), { expiresIn: '10h' });
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

export default register;