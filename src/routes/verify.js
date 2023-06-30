const jwt = require('jsonwebtoken');
import envHandler from '../helpers/envHandler';
import {protect} from '../middleware/protect';
const express = require('express');

const verify = express.Router();

verify.get('/', protect, (req, res) => {
    return res.json({ message: 'User verified' });
});

export default verify;
