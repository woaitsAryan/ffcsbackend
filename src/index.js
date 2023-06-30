const express = require('express');
const express_mongo_sanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const cors = require('cors');
import register from './routes/register';
import login from './routes/login';
import verify from './routes/verify';
import connectToDB from './initializers/DB';
import envHandler from './helpers/envHandler';

const app = express();
app.use(express.json());
app.use(cors);
app.use(express_mongo_sanitize());
connectToDB();

app.use('/register', register);
app.use('/login', login);
app.use('/verify', verify);

app.listen(envHandler('port'), () => {
    console.log('Server started on port 3000')
});
