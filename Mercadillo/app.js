import express from 'express'
import Login from './routes/LoginRoute.js'
import Task from './routes/TaskRoutes.js'
import morgan from 'morgan'
import Salesman from './routes/DashBoardSalesman.js'
import Admin from './routes/DashBoardAdmin.js'
import {PORT} from './config.js'
import cookieParser from 'cookie-parser'
import { Strategy } from 'passport-local'

const app = express()

// Settings

app.use(morgan('dev'))

app.set('port', PORT)

app.use(express.json())

app.use(cookieParser())

// Routes

app.use('/MercadilloBucaramanga', Login ,Admin,Salesman)
//app.use('/MercarilloBucaramanga',Admin)

export default app