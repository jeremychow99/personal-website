import express from 'express'
import mongoose from 'mongoose';
import { ExpressAdapter, createBullBoard, BullAdapter, BullMQAdapter } from '@bull-board/express';
import connectToCluster from './db/dbconnect';
import { myQueue, githubJob } from './jobs/githubJob';
import sanitizedConfig from './config/config';

const app = express()
const port = sanitizedConfig.PORT
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

// bull board
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter: serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());
app.get('/', (req,res) => {
  res.send('Hello World')
})

async function startServer() {
  try {
    await connectToCluster()
    app.listen(port, () => {
      console.log(`App listening on port ${port}`)
    })
  }
  catch (error) {
    console.log(error);

  }
}

startServer()
githubJob()