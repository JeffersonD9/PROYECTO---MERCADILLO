import express from 'express'
import Login from './routes/LoginRoute.js'
import Task from './routes/TaskRoutes.js'
import morgan from 'morgan'
<<<<<<< HEAD
import path from "path";
import Admin from './routes/DashBoardAdmin.js'
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


=======
import path from "path";
import Admin from './routes/DashBoardAdmin.js'
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

>>>>>>> IvanDario
// Routes

app.use('/MercadilloBucaramanga', Login ,Task)
//app.use('/MercarilloBucaramanga/DashBoard',Admin)

export default app