import { timetableDefaultValue } from "../models/defaulttimetable.js";
import User from "../models/userModel.js";
import catchAsync from "../helpers/catchAsync.js";

export const Resetcontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        let num = req.body.num;
        num = parseInt(num);

        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        user.timetables.splice(num, 1, timetableDefaultValue);
        await user.save();
        return res.json({ message: 'Timetable reset' });
})  