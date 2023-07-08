import express from 'express';
import { Coursecontroller, Slotcontroller, Inputcontroller } from '../controllers/coursescontroller.js';

const courses = express.Router();

courses.get('/:section', Coursecontroller);
courses.get('/slots/:section/:coursecode', Slotcontroller)
courses.post('/input', Inputcontroller);

export default courses;