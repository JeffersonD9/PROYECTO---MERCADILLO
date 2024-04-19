import {LoginAdmin} from "./ControllerAuthAdmin.js"
import {LoginSalesman} from "./ControllerAuthSalesman.js"

import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export async function Login(req,res){
    try {
        const { email } = req.body; // dato del email

        // Realizar la consulta filtrada
        const resultados = await prisma.admin.findMany({
          where: {
            Email: email,
          },
        });
    
        //res.json(resultados); 
        //console.log(resultados[0].id_Rol);

        const rol = resultados[0].id_Rol;
        console.log( " *********** " + rol)
        if(rol == 1){
           LoginSalesman(req,res)
        }
        else if( rol == 2){
            console.log(" rol Administrador")
            LoginAdmin(req,res)
        }else{
           console.log("Usuario no registrado")
        }

    } catch (error) {
        console.log("Error :   " + error)
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

