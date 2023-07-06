import { Finddbcontroller, Getdbcontroller } from '../controllers/sharecontroller.js';
import {protect} from '../middleware/protect.js';
import express from 'express';

const share  = express.Router();

share.post('/get', protect, Getdbcontroller);
share.post('/find', Finddbcontroller);

export default share;   