import express from 'express';
import expressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import register from './routes/register.js';
import login from './routes/login.js';
import timetable from './routes/timetable.js';
import connectToDB from './initializers/DB.js';
import share from './routes/share.js';
import verify from './routes/verify.js';
import courses from './routes/courses.js';
import bodyParser from 'body-parser';
import rateLimit from 'express-rate-limit'

const app = express();

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)

app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

app.use(cors({
    origin: '*' // Allow requests from any origin
  }));

app.use(expressMongoSanitize());

connectToDB();

app.use('/register', register);
app.use('/login', login);
app.use('/timetable', timetable);
app.use('/share', share);
app.use('/verify', verify);
app.use('/courses', courses);

app.listen(3000,"127.0.0.1",() => {
    
    console.log('Server started on port 3000')
});

export default app;