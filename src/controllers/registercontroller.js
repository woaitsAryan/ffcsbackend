import User from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envHandler from '../helpers/envHandler.js';
import catchAsync from '../helpers/catchAsync.js';

export const Registercontroller = catchAsync(
    async(req, res) => {
        let { username, password } = req.body;
        username = username.trim();
        password = password.trim();

        if (!validator.isAlphanumeric(username)) {
            return res.status(400).json({ error: 'Username must be alphanumeric' });
        }
    
        if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 0, minUppercase: 0, minNumbers: 1, minSymbols: 0, returnScore: false })) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least 1 number' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, passwordHash: hashedpassword });
        await newUser.save();
        const token = jwt.sign({ username: username, password: password }, envHandler('JWTSecret'), { expiresIn: '30d' });
        return res.json({ token });


    }
)