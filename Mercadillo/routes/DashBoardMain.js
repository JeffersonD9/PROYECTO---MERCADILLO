import { Router } from "express";
import { ListarDatosPrincipal,DatosSidebarPrincipal,FiltrarCatalogosPrincipal,FiltrarCategoriaPrincipal,MostrarInformacionUsuaro} from "../controllers/ControllerMain.js";
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router();

router.get("/",ListarDatosPrincipal); 
router.get("/sideBar",DatosSidebarPrincipal);
router.get("/filtrar/catalogo/:nombrecatalogo",FiltrarCatalogosPrincipal)
router.get("/filtrar/categoria/:nombrecategoria",FiltrarCategoriaPrincipal)
router.get("/usuario/:nombreUsuario",MostrarInformacionUsuaro)


export default router
