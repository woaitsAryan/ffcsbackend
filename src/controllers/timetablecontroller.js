import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';
import { getDayNumber } from '../helpers/daynum.js';

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
        const daynum = getDayNumber(day);
        user.timetables[timetablenum][daynum].data = daydata;
        await user.save();
        return res.json({ message: 'Timetable updated' });
      } else {
        return res.status(400).json({ error: 'Invalid timetable index' });
      }
})  


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

export const Resetcontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        let num = req.body.num;
        num = parseInt(num);

        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        user.timetables.splice(num, 1);
        await user.save();
        return res.json({ message: 'Timetable reset' });
})  

export const Getcontroller = catchAsync(
    async(req, res) => {
        
        const {userID} = req.userID;

        const user = await User.findById(userID);

        if(!user || !user.timetables){
            return res.status(400).json({ error: 'No timetable found' });
        }
        return res.json({ timetable: user.timetables });
})