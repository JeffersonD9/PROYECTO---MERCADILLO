import { Router } from "express";
import {ProfileSalesman} from '../controllers/ControllerAuthSalesman.js'
import {authRequired} from '../MiddleWares/ValidateToken.js'
import {GetProductById,CreateProduct,GetProducts,DeleteProduct,UpdateProduct} from '../controllers/ControllerProducts.js'
import {validateCreate,validateUpdate,validateParams} from '../Helpers/ValidateProducts.js'

const router = Router()

router.get("/Usuario", authRequired, ProfileSalesman)

router.get("/Productos",authRequired, GetProducts) //Ruta para mostrar productos -

router.get("/Productos/:id/Categoria/:id_Categoria", authRequired,GetProductById)

router.get("/Productos/CrearProducto",authRequired,CreateProduct)

router.get("/Productos/Edicion/:id/Categoria/:id_Categoria",authRequired,UpdateProduct)

router.get("/Productos/Eliminar/:id/Categoria/:id_Categoria",authRequired,DeleteProduct) // aca se podría utilizar getproducts para el fronted así traer todos los productos y eliminar el seleccionado por el id de la request

export default router