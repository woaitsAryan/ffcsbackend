import {protect} from '../middleware/protect.js';
import express from 'express';
import { Getcontroller } from '../controllers/getcontroller.js';
import { Storecontroller } from '../controllers/storecontroller.js';
import { Updatecontroller } from '../controllers/updatecontroller.js';
import { Resetcontroller } from '../controllers/resetcontroller.js';

const timetable = express.Router();

timetable.post('/get', protect, Getcontroller);
timetable.post('/set', protect, Storecontroller)
timetable.post('/update', protect, Updatecontroller)
timetable.post('/reset', protect, Resetcontroller)

export default timetable;
