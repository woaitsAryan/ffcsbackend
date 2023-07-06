import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    timetables: [{
        _id: false,
        day: { type: String, required: true },
        data: { type: [[String, String]], required: true }
    }],
});
      
const User = mongoose.model('User', userSchema);

export default User;