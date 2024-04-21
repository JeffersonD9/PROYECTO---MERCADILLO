import { Router } from "express";
import {ProfileAdmin} from '../controllers/ControllerAuthAdmin.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router()

router.get('/Inicio',(req,res)=>{
    res.send("Hola Mundo")
})

router.get('/Admin',authRequired, ProfileAdmin)

export default router