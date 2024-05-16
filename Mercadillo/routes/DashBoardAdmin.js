import { Router } from "express";
import {ProfileAdmin,MostrarUsuarios,EliminarUsuario,ActualizarAdmin} from '../controllers/ControllerAuthAdmin.js'
import { MostrarCategorias,EliminarCategoria,CrearCategorias, ActualizarCategorias} from "../controllers/ControllerCategoria.js";
import { CreateCatalog } from "../controllers/ControllerCatalog.js";
import {authRequired} from '../MiddleWares/ValidateToken.js'

const router = Router()

router.get('/Inicio',(req,res)=>{
    res.send("Hola Mundo")
})

router.get('/Admin',authRequired, ProfileAdmin);
router.put('/Admin/:id_admin',authRequired, ActualizarAdmin);

router.get('/Admin/Usuarios',authRequired,MostrarUsuarios);
router.delete('/Admin/Usuarios/:id_usuario',authRequired,EliminarUsuario)
router.get('/Admin/Categorias',authRequired,MostrarCategorias)
router.post('/Admin/Categorias',authRequired,CrearCategorias)
router.put('/Admin/Categorias/:id_categoria',authRequired,ActualizarCategorias)
router.delete('/Admin/Categorias/:id_categoria',authRequired,EliminarCategoria)




router.get('/Admin/Catalogo',authRequired,CreateCatalog)







export default router