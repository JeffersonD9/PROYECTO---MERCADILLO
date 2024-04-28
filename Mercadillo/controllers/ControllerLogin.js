import {LoginAdmin} from "./ControllerAuthAdmin.js"
import {LoginSalesman} from "./ControllerAuthSalesman.js"
import {SearchUser} from "../Services/ServicesUser.js"
export async function Login(req,res){

    const {Email} = req.body
        const role = await SearchUser(Email)

     if(role == 1){

        LoginSalesman(req,res)

     }
     else if( role == 2){

        LoginAdmin(req,res)
        
     }else{

        res.status(404).json({ message: "El Usuario No Existe" });
     }
        
}

export async function LogOut(req,res){

    res.cookie('token', "",{
        expires : new Date(0)
    })

    return res.sendStatus(200)
}