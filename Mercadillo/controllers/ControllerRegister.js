import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import {CreateAccesToken} from "../Services/CreateToken.js"

const prisma = new PrismaClient()

async function Register(req,res){
    
    const data = req.body
    console.log(data)

    try {    

       const passwordHash = await bcrypt.hash(data.Password,10)
       data.Password = passwordHash; 
       data.id_Rol = 1;
       console.log(data)
       const newUser = await prisma.usuario.create({ 
            data: data
       }) 

        const token = await CreateAccesToken({
        id: newUser.id,
        UserName: newUser.UserName
       })
       
        res.cookie('token',token);
        res.status(201).send({
            UserName: data.UserName,
            Email: data.Email,
            DateCreated: data.DateCreated,
            redirect: "Usuario"               
        });
       } 

       catch (error) {    
           
           if(error.code == 'P2002' && error.meta.target.includes('Usuario_UserName_key')){
            res.status(409).json({
                   error:{
                       message: `El usuario ${data.UserName} ya existe`,
                       code: 'CONFLICT',
                       details: error.meta.target
                   }
               })      
   
           }else if(error.code == 'P2002' && error.meta.target.includes('Usuario_Email_key')){
            res.status(409).json( {
                   error:{
                       message: `El correo ingresado ${data.Email} ya esta existe`,
                       code: 'CONFLICT',
                       details: error.meta.target
                   }
               })
           }else{
            res.status(500).send("Algo salio mal")
            console.log(error)
           }
       }
}

export {Register}