import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Updatecontroller = catchAsync(
    async(req, res) => {
      const { username } = req.user;
      const timetable = req.body.timetable;
      const timetablenum = req.body.num;
    
      const user = await User.findOne({ username: username });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
    
      if (user.timetables.length > timetablenum) {
        user.timetables[timetablenum].data = timetable;
        await user.save();
        return res.json({ message: 'Timetable updated' });
      } else {
        return res.status(400).json({ error: 'Invalid timetable index' });
      }
})  