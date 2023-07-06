import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Getcontroller = catchAsync(
    async(req, res) => {
        
        const {userID} = req.userID;

        const user = await User.findById(userID);

        if(!user || !user.timetables){
            return res.status(400).json({ error: 'No timetable found' });
        }
        return res.json({ timetable: user.timetables });
})