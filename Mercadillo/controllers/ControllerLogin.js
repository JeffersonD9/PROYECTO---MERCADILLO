import {LoginAdmin} from "./ControllerAuthAdmin.js"
import {LoginSalesman} from "./ControllerAuthSalesman.js"
import {PrismaClient} from '@prisma/client'
import { SearchUser } from "../Services/ServicesUser.js"
const prisma = new PrismaClient()

export async function Login(req,res){
    try {
        
        const {Email} = req.body
        const user = await SearchUser(Email)
        if(user){
            const role = user.user.id_Rol
            if(role == 1 ){
    
                LoginSalesman(req,res)  
             }
             else if( role == 2){
        
                LoginAdmin(req,res)
             }
            else{
                
               console.log("Usuario no registrado")
            }
        }
         

    } catch (error) {

        res.status(500).json({ message: "Algo ha ido mal" });
    }   
}

export async function LogOut(req,res){

    res.cookie('token', "",{
        expires : new Date(0)
    })

    return res.sendStatus(200)
}


export  function Ingresar(req,res){
    res.render("login");
}
export  function IngresarFormRegistroUsuario(req,res){
    res.render("registrarUsuario");
}


