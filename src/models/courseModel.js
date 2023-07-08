import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    type: { type: String, required: true, unique: true },
    details:[{
        _id: false,
        code: { type: String, required: true, unique: true },
        name: { type: String, required: true, unique: true },
        credits: { type: Number, required: true },
        slots: [
            {
                _id: false,
                theoryslot: { type: String, required: true },
                faculty: { type: String, required: true },
                venue: { type: String, required: true },
                labslot: { type: String }
            }
        ]
    }]
});
      
const Course = mongoose.model('Course', courseSchema);

export default Course;