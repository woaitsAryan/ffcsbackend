import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Getdbcontroller = catchAsync(
    async(req, res) => {
        const {username} = req.user;
        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        const userID = user._id;
        return res.json({"userID": userID});
})