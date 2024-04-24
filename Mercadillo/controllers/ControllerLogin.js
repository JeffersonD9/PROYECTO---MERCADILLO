import {LoginAdmin} from "./ControllerAuthAdmin.js"
import {LoginSalesman} from "./ControllerAuthSalesman.js"
import { SearchUser } from "../Services/ServicesUser.js"

export async function Login(req,res){

    try {       

        const {Email} = req.body
        const role = await SearchUser(Email)

            if(role == 1){
    
                LoginSalesman(req,res)  
             }

             else if(role == 2){
        
                LoginAdmin(req,res)
             }
            else{              
               res.status(404).json({message: "No existe ninguno"})
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


