import catchAsync from "../helpers/catchAsync.js";
import Course from "../models/courseModel.js";

export const Coursecontroller = catchAsync(
    async (req, res) => {
        const section = req.params.section;
        const courses = await Course.findOne({ type: section });
        if(!courses){
            return res.status(400).json({ error: 'Invalid section' });
        }
        return res.json({ coursesdata: courses.details });
})

export const Slotcontroller = catchAsync(
    async (req, res) => {
        const section = req.params.section;
        const course = req.params.course;
        const courses = await Course.findOne({ type: section });
        if(!courses){
            return res.status(400).json({ error: 'Invalid section' });
        }
        const slots = courses.details.filter((item) => item.name === course);
        return res.json({ slots: slots[0].slots });
    }
)