import { Router } from "express";
import {Register,AuthUser} from '../controllers/ControllerLogin.js'
import {validateCreate} from '../utils/Validators/Users.js'

const router = Router()

router.get("/Login",(req,res)=>{
    res.send("Hola soy el Login")
})

router.post("/Registrar", validateCreate, Register ,(req,res)=>{
    res.send("Registrando")
})

export default router