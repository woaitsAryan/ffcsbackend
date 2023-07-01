import {protect} from '../middleware/protect.js';
import express from 'express';
import jwt from 'jsonwebtoken';

const verify = express.Router();

verify.post('/', protect, (req, res) => {
    return res.json({ username: req.user });
    //add some more data to return too, for the server
});

export default verify;
