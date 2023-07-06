import User from '../models/userModel.js';
import catchAsync from '../helpers/catchAsync.js';

export const Getdbcontroller = catchAsync(
    async(req, res) => {
        const {userID} = req.userID;
        return res.json({"userID": userID});
})