import express from 'express'
import cors from 'cors'
import connectToCluster from './db/connect';
import router from './Routes/main';


const app = express()
import { errorHandlerMiddleware } from './middleware/error-handler'

app.use(cors())
app.use(express.json())
app.use('/', router)

app.use(errorHandlerMiddleware)

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