import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Storecontroller = catchAsync(
    async(req, res) => {
        const {username} = req.user;
        const timetable = req.body.timetable;
        const timetablenum = req.body.num;

        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        user.timetables[timetablenum] = timetable;
        await user.save();
        return res.json({ message: 'Timetable saved successfully' });
})