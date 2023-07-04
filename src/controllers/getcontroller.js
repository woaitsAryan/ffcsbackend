import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Getcontroller = catchAsync(
    async(req, res) => {
        
        const {username} = req.user;

        const user = await User.findOne({ username });

        if(!user || !user.timetable){
            return res.status(400).json({ error: 'No timetable found' });
        }
        return res.json({ timetable: user.timetable });
})