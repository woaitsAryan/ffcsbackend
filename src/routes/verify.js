import {protect} from '../middleware/protect.js';
import express from 'express';

const verify  = express.Router();

verify.post('/', protect, (req, res) => {
    res.json({verified: true});
})

export default verify;