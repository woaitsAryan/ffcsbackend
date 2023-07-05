import { timetableDefaultValue } from "../models/defaulttimetable";
import { User } from "../models/user";
import { catchAsync } from "../utils/catchAsync";

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