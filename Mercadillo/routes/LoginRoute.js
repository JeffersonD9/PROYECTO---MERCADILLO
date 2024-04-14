import { Router } from "express";
import {Register} from '../controllers/ControllerRegister.js'
import {AuthUser, LogOut, Profile} from '../controllers/ControllerAuthUser.js'
import {validateCreate} from '../utils/Users.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router()

router.post("/Login", AuthUser)

router.post("/Registrar", validateCreate, Register)

router.post("/LogOut",LogOut)

router.get("/Profile", authRequired, Profile)

export default router