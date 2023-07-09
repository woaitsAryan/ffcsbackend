import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';
import { getDayNumber } from '../helpers/daynum.js';

export const Updatecontroller = catchAsync(
    async(req, res) => {
      const { userID } = req.userID;
      const {timetable, num, friendid} = req.body;
      const timetablenum = parseInt(num);
      if(friendid != null){
        const friend = await User.findById(friendid);
        if(!friend){
          return res.status(400).json({ error: 'Friend not found' });
        }
        if(friend.friendid != userID){
          return res.status(400).json({ error: 'You are not his friend' });
        }
        if (friend.timetables.length > timetablenum) {
          friend.timetables[timetablenum] = timetable;
          await friend.save();
          return res.json({ message: 'Timetable updated' });
        }
      }
      else{
        const user = await User.findById(userID);
        if (!user) {
          return res.status(400).json({ error: 'User not found' });
        }
      
        if (user.timetables.length >= timetablenum) {
          user.timetables[timetablenum] = timetable;
          await user.save();
          return res.json({ message: 'Timetable updated' });
        } else {
          return res.status(400).json({ error: 'Invalid timetable index' });
      }}
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