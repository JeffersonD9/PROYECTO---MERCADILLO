import { Router } from "express";
import {Profile} from '../controllers/ControllerAuthUser.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'
const router = Router()

router.get('/Inicio',(req,res)=>{
    res.send("Hola Mundo")
})

router.get('/Admin',authRequired, Profile)

export default router