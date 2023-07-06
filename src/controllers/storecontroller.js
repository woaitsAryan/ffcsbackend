import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Storecontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        const { timetable} = req.body;
        
        const user = await User.findById(userID);

        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        user.timetables.push(timetable);

        await user.save();
        return res.json({ message: 'Timetable saved successfully' });
})