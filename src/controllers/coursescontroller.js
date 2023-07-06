import catchAsync from "../helpers/catchAsync";
import Course from "../models/courseModel";

export const Coursecontroller = catchAsync(
    async (req, res) => {
        const section = req.params.section;
        const courses = await Course.findOne({ type: section });
        return res.json({ coursesdata: courses.details });
})

export const Slotcontroller = catchAsync(
    async (req, res) => {
        const section = req.params.section;
        const course = req.params.course;
        const courses = await Course.findOne({ type: section });
        const slots = courses.details.filter((item) => item.name === course);
        return res.json({ slots: slots[0].slots });
    }
)