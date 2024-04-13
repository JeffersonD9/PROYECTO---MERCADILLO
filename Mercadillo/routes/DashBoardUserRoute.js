import { Router } from "express";
import {AuthUser} from '../controllers/ControllerLogin.js'

const router = Router()

router.get('/Inicio',(req,res)=>{
    res.send("Hola Mundo")
})

router.get('/DashBoard/User/', AuthUser)

export default router