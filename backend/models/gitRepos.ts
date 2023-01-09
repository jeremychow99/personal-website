import mongoose from 'mongoose';
const { Schema } = mongoose;

const GitRepoSchema = new Schema({
  repoNumber: Number,
  repoName:  String, // String is shorthand for {type: String}
  description: String,
  createdAt: String,
  updatedAt: String,
  language: String,
  size: Number,
  url: String,
  dbEntryCreationTime: String,
  }
);

export const gitRepo = mongoose.model('gitRepo', GitRepoSchema)