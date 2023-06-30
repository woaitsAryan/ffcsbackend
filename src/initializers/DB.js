import mongoose from 'mongoose';

const URL = 'mongodb://localhost/mydatabase'
const connectToDB = () =>
    mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Connected to Database!'));

export default connectToDB;