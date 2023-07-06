import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import envHandler from '../helpers/envHandler.js';
import catchAsync from '../helpers/catchAsync.js';

export const Logincontroller = catchAsync(
    async (req, res) => {
        let { username, password } = req.body;
        username = username.trim();
        password = password.trim();

        const user = await User.findOne({username})
        if (!user) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const result = await bcrypt.compare(password, user.passwordHash);
        if(!result){
            return res.status(400).json({ error: 'Invalid username or password' });
        }
        const token = jwt.sign({ userID: user._id }, envHandler('JWTSecret'), { expiresIn: '30d' });
        return res.json({ token });

    }
)