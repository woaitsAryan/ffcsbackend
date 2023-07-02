import {protect} from '../middleware/protect.js';
import express from 'express';
import User from '../models/userModel.js';

const verify = express.Router();

verify.post('/', protect, (req, res) => {
    username = req.user;

    User.findOne({ username })
        .then((existingUser) => {
            if (!existingUser || !existingUser.timetable) {
                return res.status(400).json({ error: 'No timetable found' });
            }
            return res.json({ timetable: existingUser.timetable });
        })
});

export default verify;
