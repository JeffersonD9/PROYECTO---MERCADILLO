import { Router } from "express";
import {Register} from '../controllers/ControllerRegister.js'
import {Login, LogOut, ProfileSalesman} from '../controllers/ControllerAuthUser.js'
import {validateCreate} from '../MiddleWares/Users.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router()

router.post("/Login", Login)

router.post("/Registrar", validateCreate, Register)

router.post("/LogOut",LogOut)

router.get("/Usuario", authRequired, ProfileSalesman)

export default router