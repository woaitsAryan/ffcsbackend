import {protect} from '../middleware/protect.js';
import express from 'express';
import jwt from 'jsonwebtoken';

const verify = express.Router();

verify.get('/', protect, (req, res) => {
    return res.json({ message: 'User verified' });
});

export default verify;
