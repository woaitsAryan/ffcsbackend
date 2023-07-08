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
        const coursecode = req.params.coursecode;
        const courses = await Course.findOne({ type: section });
        if(!courses){
            return res.status(400).json({ error: 'Invalid section' });
        }
        const slots = courses.details.filter((item) => item.code === coursecode);
        return res.json({ slots: slots[0].slots });
    }
)

export const Inputcontroller = catchAsync(
    async (req, res) => {
        const details = req.body;
        const {type} = details;
        const existingType = await Course.findOne({ type });
        if (existingType) {
            console.log("Type already exists");
            //update the existing type
            existingType.details = details.details;
            await existingType.save();
        }
        const newType = new Course(details);
        await newType.save();
        return res.json({ message: 'Course data saved successfully' });
    })