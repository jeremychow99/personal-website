import express from 'express'
import mongoose from 'mongoose';
import { User } from './models/addData'
import { Octokit, App } from "octokit";
import { Worker, Queue } from 'bullmq';
import { ExpressAdapter, createBullBoard, BullAdapter, BullMQAdapter } from '@bull-board/express';
import config from './config/config';

const app = express()
const port = 3000
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/admin/queues');


const myQueue = new Queue('myQueue', {
  connection: {
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
  }
});

myQueue.add(
  'githubJob',
  { foo: 'bar' },
  {
    repeat: {
      every: 60000,
    },
  },
);

async function clearCollections() {
  const collections = mongoose.connection.collections;

  await Promise.all(Object.values(collections).map(async (collection) => {
    await collection.deleteMany({}); // an empty mongodb selector object ({}) must be passed as the filter argument
  }));
}

const worker = new Worker('myQueue', async job => {

  if (job.name === 'githubJob') {
    const octokit = new Octokit({
      auth: config.GITHUB_TOKEN
    })

    const gitResponse = await octokit.request('GET /users/jeremychow99/repos{?type,sort,direction,per_page,page}', {
      username: 'jeremychow99'
    })


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
    host: config.REDIS_HOST,
    port: config.REDIS_PORT
  }
});

// bull board
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter: serverAdapter,
});


app.use('/admin/queues', serverAdapter.getRouter());

mongoose.connect(config.MONGO_URL)
  .then(() => {
    console.log('Connected to the database ')
  })
  .catch((err) => {
    console.error(`Error connecting to the database. n${err}`);
  })

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
