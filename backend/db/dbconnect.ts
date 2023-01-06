import sanitizedConfig from '../config/config';
import mongoose from "mongoose";

export default function connectToCluster() {
  mongoose.connect(sanitizedConfig.MONGO_URL)
    .then(() => {
      console.log('Connected to the database ')
    })
    .catch((err) => {
      console.error(`Error connecting to the database. n${err}`);
    })
}
