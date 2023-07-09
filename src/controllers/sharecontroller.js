import catchAsync from '../helpers/catchAsync.js';
import User from '../models/userModel.js';

export const Getdbcontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        return res.json({"userID": userID});
})

export const Finddbcontroller = catchAsync(
    async(req, res) => {
        const { userID, num } = req.body;
        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        const timetable = user.timetables[num];
        return res.json({timetable: timetable});
})

export const Friendcontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        const {friendname} = req.body;
        const friendID = await User.findOne({username: friendname});
        if(!friendID){
            return res.status(400).json({ error: 'Friend not found' });
        }
        const user = await User.findById(userID);
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        user.friendid = friendID._id;
        await user.save();
        return res.json({message: 'Friend added'});
    })