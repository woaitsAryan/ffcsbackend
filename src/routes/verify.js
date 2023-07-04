import {protect} from '../middleware/protect.js';
import express from 'express';
import User from '../models/userModel.js';
import { Verifycontroller } from '../controllers/verifycontroller.js';

const verify = express.Router();

verify.post('/', protect, Verifycontroller);

export default verify;
