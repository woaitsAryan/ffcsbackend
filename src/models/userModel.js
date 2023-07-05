import mongoose from 'mongoose';
import { timetableDefaultValue } from './defaulttimetable.js'

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    timetables: {
        type: [
            {
                day: { type: String, required: true },
                data: { type: [[String, String]], required: true }
            }
        ],
        default: [timetableDefaultValue] 
    }
});
      
const User = mongoose.model('User', userSchema);

export default User;