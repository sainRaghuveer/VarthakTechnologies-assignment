import mongoose, { Schema, Document, ObjectId } from 'mongoose';
import userModel from "./user.model"
export interface Book extends Document {
    title: string;
    author: string;
    createdBy: ObjectId;
  }
  
  const bookSchema: Schema = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  }, {
    timestamps: true,
    versionKey: false
});
  
  const bookModel = mongoose.model('Book', bookSchema);

  export default bookModel