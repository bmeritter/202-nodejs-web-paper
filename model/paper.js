import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
  stack: String,
  description: String,
  gitAddress: String
});

const Homework = mongoose.model('Homework', homeworkSchema);

export default  Homework;