import express from 'express'
import cors from 'cors'
import { ExpressAdapter, createBullBoard, BullAdapter, BullMQAdapter } from '@bull-board/express';
import connectToCluster from './db/dbconnect';
import { myQueue, githubJob } from './jobs/githubJob';
import sanitizedConfig from './config/config';
import getRepoData from './middleware/getRepoData';
import { auth } from './middleware/authentication'

const app = express()
const router = express.Router()
const port = sanitizedConfig.PORT
const serverAdapter = new ExpressAdapter();

serverAdapter.setBasePath('/admin/queues');

// setup bull board dashboard to monitor jobs in browser 
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullMQAdapter(myQueue)],
  serverAdapter: serverAdapter,
});
app.use('/admin/queues', serverAdapter.getRouter());
app.use(cors());
app.use(express.json());

app.use('/admin/queues', auth)
app.get('/', async (req, res) => {
  const repoData = await getRepoData()
  res.send(repoData)
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