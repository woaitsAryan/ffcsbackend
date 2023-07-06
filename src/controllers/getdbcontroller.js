import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Getdbcontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        return res.json({"userID": userID});
})