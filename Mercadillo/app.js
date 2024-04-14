import express from 'express'
import DashBoard from './routes/DashBoardUserRoute.js'
import Login from './routes/LoginRoute.js'
import Task from './routes/TaskRoutes.js'
import morgan from 'morgan'
import Admin from './routes/DashBoardUserRoute.js'
import {PORT} from './config.js'
import cookieParser from 'cookie-parser'

const app = express()

// Settings

app.use(morgan('dev'))

app.set('port', PORT)

app.use(express.json())

app.use(cookieParser())

// Routes

app.use('/MercadilloBucaramanga', DashBoard, Login,Task)
app.use('/MercarilloBucaramanga/DashBoard',Admin)

export default app