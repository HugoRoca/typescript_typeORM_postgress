import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { createConnection } from 'typeorm'
import userRoute from './routes/user.routes'

const app = express()
createConnection()
// middlewares
app.use(cors()).use(morgan('dev')).use(express.json())

// routes
app.use(userRoute)

app.listen(3000, () => console.log('server is running in port 3000'))