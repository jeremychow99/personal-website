import express from 'express'
import router from './Routes/main'
import connectToCluster from './db/connect';
const app = express()

app.use(express.json());
app.use('/', router)

async function startServer() {
  try {
    await connectToCluster()
    app.listen(3001, () => {
      console.log(`App listening on port 3001`)
    })
  }
  catch (error) {
    console.log(error);

  }
}

startServer()