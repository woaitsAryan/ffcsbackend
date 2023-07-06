import {protect} from '../middleware/protect.js';
import express from 'express';
import { Getcontroller, Storecontroller, Updatecontroller, Resetcontroller } from '../controllers/timetablecontroller.js';

const timetable = express.Router();

timetable.post('/get', protect, Getcontroller);
timetable.post('/set', protect, Storecontroller)
timetable.post('/update', protect, Updatecontroller)
timetable.post('/reset', protect, Resetcontroller)

export default timetable;
