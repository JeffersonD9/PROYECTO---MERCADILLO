import { Router } from "express";
import {Register} from '../controllers/ControllerRegister.js'
<<<<<<< HEAD
import {Login, LogOut} from '../controllers/ControllerLogin.js'
=======
import {Login, LogOut,Ingresar,IngresarFormRegistroUsuario} from '../controllers/ControllerLogin.js'
>>>>>>> IvanDario
import {validateCreate} from '../MiddleWares/Users.js'
import {ProfileSalesman} from '../controllers/ControllerAuthSalesman.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router()
<<<<<<< HEAD

router.post("/Login", Login)

=======
router.get("/Login", Ingresar)
router.post("/Login", Login)

router.get("/Registrar", IngresarFormRegistroUsuario)
>>>>>>> IvanDario
router.post("/Registrar", validateCreate, Register)

router.post("/LogOut",LogOut)

router.get("/Usuario", authRequired, ProfileSalesman)

export default router