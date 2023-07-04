import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Updatecontroller = catchAsync(
    async(req, res) => {
        const {username} = req.user;
        const timetable = req.body.timetable;
        const day = req.body.day;
        await User.updateOne(
            { username: username, 'timetable.day': day }, // Filter to find the specific user and the timetable with "day" as "monday"
            {
              $set: {
                'timetable.$.data': timetable
              }
            }
        )
        return res.json({ message: 'Timetable updated' });
    })  