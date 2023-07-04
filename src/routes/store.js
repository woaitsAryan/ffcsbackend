import {protect} from '../middleware/protect.js';
import express from 'express';
import User from '../models/userModel.js';
import { Storecontroller } from '../controllers/getcontroller.js';

const store = express.Router();

store.post('/', protect, Storecontroller);

export default store;