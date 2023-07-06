import express from 'express';
import { Coursecontroller, Slotcontroller } from '../controllers/coursescontroller.js';

const courses = express.Router();

courses.get('/:section', Coursecontroller);
courses.get('/slots/:section/:course', Slotcontroller)

export default courses;