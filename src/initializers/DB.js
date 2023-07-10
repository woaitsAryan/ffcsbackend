import mongoose from 'mongoose';
import envHandler from '../helpers/envHandler.js';

const URL = envHandler('mongoURI');
const connectToDB = () =>
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to Database!'));

export default connectToDB;