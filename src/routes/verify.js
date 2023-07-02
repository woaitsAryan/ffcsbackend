import {protect} from '../middleware/protect.js';
import express from 'express';
import User from '../models/userModel.js';

const verify = express.Router();

verify.post('/', protect, (req, res) => {
    username = req.user;
    //Find timetable of the user and return it
    User.findOne({ username })
        .then((existingUser) => {
            return res.json({ timetable: existingUser.timetable });
        })
});

export default verify;
