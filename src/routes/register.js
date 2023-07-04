import express from 'express';
import { Registercontroller } from '../controllers/registercontroller.js';

const register = express.Router();

register.post('/', Registercontroller);

export default register;