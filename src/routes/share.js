import { Finddbcontroller, Getdbcontroller, Friendcontroller } from '../controllers/sharecontroller.js';
import {protect} from '../middleware/protect.js';
import express from 'express';

const share  = express.Router();

share.post('/get', protect, Getdbcontroller);
share.post('/find', Finddbcontroller);
share.post('/addfriend', protect, Friendcontroller)
export default share;   

const response = await postHandler('http://127.0.0.1:3000/share/get', {}, true)
if(response.status === 0){
  toast.error("Please login to share");
  return;
}
const shareID = `http://localhost:3000/timetable/${response.data.userID}/${Timetablenumber}`
await navigator.clipboard.writeText(shareID)
toast.success("URL copied in clipboard")