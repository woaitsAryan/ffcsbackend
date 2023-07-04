import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Finddbcontroller = catchAsync(
    async(req, res) => {
        const { userID } = req.body;
        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        const timetable = user.timetable;
        return res.json({timetable: timetable});
    })