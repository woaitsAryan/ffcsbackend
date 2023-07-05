import { timetableDefaultValue } from "../models/defaulttimetable.js";
import User from "../models/userModel.js";
import catchAsync from "../helpers/catchAsync.js";

export const Resetcontroller = catchAsync(
    async(req, res) => {
        const {username} = req.user;
        const timetablenum = req.body.num;

        const user = await User.findOne({ username });
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        user.timetables[timetablenum] = timetableDefaultValue;
        await user.save();
        return res.json({ message: 'Timetable reset' });
})