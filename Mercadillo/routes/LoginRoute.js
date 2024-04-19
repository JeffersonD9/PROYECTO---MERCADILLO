import { Router } from "express";
import {Register} from '../controllers/ControllerRegister.js'
import {Login, LogOut} from '../controllers/ControllerLogin.js'
import {validateCreate} from '../MiddleWares/User.js'
import {ProfileSalesman} from '../controllers/ControllerAuthSalesman.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router()

router.post("/Login", Login)

router.post("/Registrar", validateCreate, Register)

router.post("/LogOut",LogOut)

router.get("/Usuario", authRequired, ProfileSalesman)

export default router