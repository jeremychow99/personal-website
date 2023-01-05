import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
  title:  String, // String is shorthand for {type: String}
  createdAt: String
  }
);

export const User = mongoose.model('User', UserSchema)