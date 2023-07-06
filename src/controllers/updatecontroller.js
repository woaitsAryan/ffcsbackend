import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Updatecontroller = catchAsync(
    async(req, res) => {
      const { userID } = req.userID;
      const {daydata, num, day} = req.body;
      const timetablenum = parseInt(num);
    
      const user = await User.findById(userID);
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    
      if (user.timetables.length > timetablenum) {
        user.timetables[timetablenum].day = daydata;
        await user.save();
        return res.json({ message: 'Timetable updated' });
      } else {
        return res.status(400).json({ error: 'Invalid timetable index' });
      }
})  