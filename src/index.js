import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import cors from 'cors';
import register from './routes/register.js';
import login from './routes/login.js';
import verify from './routes/verify.js';
import connectToDB from './initializers/DB.js';
import envHandler from './helpers/envHandler.js';
import store from './routes/store.js';

const ip = '127.0.0.1'

const app = express();
app.use(express.json());
app.use(cors());
app.use(expressMongoSanitize());
connectToDB();

app.use('/register', register);
app.use('/login', login);
app.use('/verify', verify);
app.use('/store', store);

app.listen(envHandler('port'),ip ,() => {
    console.log('Server started on port 3000')
});

export default app;