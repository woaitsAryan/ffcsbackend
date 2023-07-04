import User from '../models/userModel.js';


export const Verifycontroller = catchAsync(
    async(req, res) => {
        username = req.user;

        const user = await User.findOne({ username });

        if(!user || !user.timetable){
            return res.status(400).json({ error: 'No timetable found' });
        }
        return res.json({ timetable: user.timetable });
})