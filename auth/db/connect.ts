import sanitizedConfig from '../utils/config';
import mongoose from "mongoose";

export default function connectToCluster() {
  mongoose.connect(sanitizedConfig.MONGO_URI)
    .then(() => {
      console.log('Connected to the database ')
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    })
}
