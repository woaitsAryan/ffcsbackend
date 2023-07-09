import { Finddbcontroller, Getdbcontroller, Friendcontroller } from '../controllers/sharecontroller.js';
import {protect} from '../middleware/protect.js';
import express from 'express';

const share  = express.Router();

share.post('/get', protect, Getdbcontroller);
share.post('/find', Finddbcontroller);
share.post('/addfriend', protect, Friendcontroller)

export default share;   
