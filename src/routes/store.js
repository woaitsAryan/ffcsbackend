import {protect} from '../middleware/protect.js';
import express from 'express';
import User from '../models/userModel.js';

const store = express.Router();

store.post('/', protect, (req, res) => {
    username = req.user;
    timetable = req.body.timetable;

    User.findOne({ username })
        .then((existingUser) => {
            existingUser.timetable = timetable;
            existingUser.save()
                .then(() => {
                    return res.json({ message: 'Timetable saved successfully' });
                })
                .catch((error) => {
                    console.error(error);
                    return res.status(500).json({ error: 'Internal Server Error' });
                });
        })
});