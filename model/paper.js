import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const paperSchema = new Schema({
  name: String,
  description: String,
  homeworks: [{
    type: Schema.ObjectId,
    ref: 'Homework'
  }]
});

const Paper = mongoose.model('Paper', paperSchema);

export default  Paper;