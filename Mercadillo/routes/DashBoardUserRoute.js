import { Router } from "express";
import {AuthUser} from '../controllers/ControllerLogin.js'

const router = Router()

router.get('/DashBoard/User/:query', AuthUser)

export default router