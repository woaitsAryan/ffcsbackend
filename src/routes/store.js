import {protect} from '../middleware/protect.js';
import express from 'express';
import { Storecontroller } from '../controllers/storecontroller.js';

const store = express.Router();

store.post('/', protect, Storecontroller);

export default store;