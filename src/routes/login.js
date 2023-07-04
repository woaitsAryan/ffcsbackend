import express from 'express';
import { Logincontroller } from '../controllers/logincontroller.js';

const login = express.Router();

login.post('/', Logincontroller);

export default login;