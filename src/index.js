import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import register from './routes/register.js';
import login from './routes/login.js';
import timetable from './routes/timetable.js';
import connectToDB from './initializers/DB.js';
import envHandler from './helpers/envHandler.js';
import share from './routes/share.js';
import verify from './routes/verify.js';

const ip = '127.0.0.1'

const app = express();
app.use(express.json());
app.use(cors());
app.use(expressMongoSanitize());
connectToDB();

app.use('/register', register);
app.use('/login', login);
app.use('/timetable', timetable);
app.use('/share', share);
app.use('/verify', verify);

app.listen(envHandler('port'),ip ,() => {
    console.log('Server started on port 3000')
});

export default app;