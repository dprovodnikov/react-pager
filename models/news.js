import mongoose, { Schema } from 'mongoose';

const NewsSchema = new Schema({
  title: {
    type: String,
    require: true
  },
  content: {
    type: String,
    require: true,
  }
});

export default mongoose.model('News', NewsSchema);