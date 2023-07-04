import {protect} from '../middleware/protect.js';
import express from 'express';
import { Getcontroller } from '../controllers/getcontroller.js';
import { Storecontroller } from '../controllers/storecontroller.js';
import { Updatecontroller } from '../controllers/updatecontroller.js';

const verify = express.Router();

verify.post('/get', protect, Getcontroller);
verify.post('/set', protect, Storecontroller)
verify.post('/update', protect, Updatecontroller)

export default verify;