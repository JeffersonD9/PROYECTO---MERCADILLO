import {LoginAdmin} from "./ControllerAuthAdmin.js"
import {LoginSalesman} from "./ControllerAuthSalesman.js"

export async function Login(req,res){

    const rol = req.body.id_Rol

     if(rol == 1){

        LoginSalesman(req,res)

     }
     else if(rol == 2){

        LoginAdmin(req,res)
        
     }
        
}

export async function LogOut(req,res){

    res.cookie('token', "",{
        expires : new Date(0)
    })

    return res.sendStatus(200)
}


