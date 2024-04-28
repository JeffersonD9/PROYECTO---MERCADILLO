import express from 'express'
import Login from './routes/LoginRoute.js'
import Task from './routes/TaskRoutes.js'
import morgan from 'morgan'
import path from 'path'
import Salesman from './routes/DashBoardSalesman.js'
import Admin from './routes/DashBoardAdmin.js'
import path from 'path'
import {PORT} from './config.js'
import cors from "cors";
import cookieParser from 'cookie-parser'
const app = express()
app.use(cors());
app.use(morgan('dev'));

//Path

let  __dirname = path.dirname(new URL(import.meta.url).pathname);
__dirname = __dirname.slice(1);
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'views'));  //Identificar la carpeta views
app.use(express.static(path.join(__dirname, "public"))); //Identificar la carpeta public


app.set('port', PORT)
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser())

app.get("/MercadilloBucaramanga",(req,res)=>{
    res.render("index");
});

// Routes

app.use('/MercadilloBucaramanga', Login ,Admin,Salesman)
//app.use('/MercarilloBucaramanga',Admin)

export default app