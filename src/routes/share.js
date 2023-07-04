import { Finddbcontroller } from '../controllers/finddbcontroller.js';
import { Getdbcontroller } from '../controllers/getdbcontroller.js';
import {protect} from '../middleware/protect.js';
import express from 'express';

const share  = express.Router();

share.post('/get', protect, Getdbcontroller);
share.post('/find', Finddbcontroller);

export default share;   