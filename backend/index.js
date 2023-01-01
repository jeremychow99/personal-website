import express from 'express'
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import { User } from './models/addData.js'
import { Octokit, App } from "octokit";
import { Worker, Queue } from 'bullmq';
import { ExpressAdapter, createBullBoard, BullAdapter, BullMQAdapter } from '@bull-board/express';

dotenv.config()

const app = express()
const port = 3000
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');

const myQueue = new Queue('myQueue', {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

await myQueue.add(
  'githubJob',
  { foo: 'bar' },
  {
    repeat: {
      every: 60000,
    },
  },
  { removeOnComplete: true, removeOnFail: true },
);

const worker = new Worker('myQueue', async job => {

  if (job.name === 'githubJob') {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    })

    const gitResponse = await octokit.request('GET /users/jeremychow99/repos{?type,sort,direction,per_page,page}', {
      username: 'jeremychow99'
    })

    async function clearCollections() {
      const collections = mongoose.connection.collections;

      await Promise.all(Object.values(collections).map(async (collection) => {
        await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
      }));
    }
    clearCollections()

    for (let repo of gitResponse.data) {
      console.log(repo.name)
      const doc = new User(
        {
          title: repo.name
        }
      )
      doc.save()
    }
  }
}, {
  connection: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
  }
});

// bull board
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter: serverAdapter,
});


app.use('/admin/queues', serverAdapter.getRouter());

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to the database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



// import express from 'express';
// import Queue from 'bull';
// import QueueMQ from 'bullmq';
// import { ExpressAdapter, createBullBoard, BullAdapter, BullMQAdapter } from '@bull-board/express';

// const someQueue = new Queue('someQueueName', {
//   redis: { port: 6379, host: '127.0.0.1', password: 'foobared' },
// }); // if you have a special connection to redis.







// app.use('/admin/queues', serverAdapter.getRouter());

