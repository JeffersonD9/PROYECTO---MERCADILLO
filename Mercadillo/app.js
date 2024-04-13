import express from 'express'
import DashBoard from './routes/DashBoardUserRoute.js'
import Login from './routes/LoginRoute.js'
import morgan from 'morgan'
import {PORT} from './config.js'

const app = express()

// Settings

app.use(morgan('dev'));

app.set('port', PORT);

app.use(express.json())

// Routes

app.use('/MercadilloBucaramanga', DashBoard, Login);


export default app