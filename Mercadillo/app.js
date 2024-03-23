import express from 'express'
import routes from './routes/DashBoardUserRoute.js'
import morgan from 'morgan'
import {PORT} from './config/config.js'

const app = express()

// Settings

app.use(morgan('dev'));

app.set('port', PORT);

app.use(express.json())

// Routes

app.use('/MercadilloBucaramanga', routes);

export default app