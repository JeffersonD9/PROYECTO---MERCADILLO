<<<<<<< HEAD
import {CreateAccesToken} from "../Services/CreateToken.js"
import{EncryptPassword,CreateUser} from "../Services/ServicesUser.js"

async function Register(req,res){
  
=======
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import {CreateAccesToken} from "../Services/CreateToken.js"

const prisma = new PrismaClient()

async function Register(req,res){
    
>>>>>>> IvanDario
    const data = req.body

    try {    

<<<<<<< HEAD
       data.Password = await EncryptPassword(data)
       data.id_Rol = 1;

       const newUser = await CreateUser(data)

       const token = await CreateAccesToken({
       id: newUser.id,
       UserName: newUser.UserName          })
=======
       const passwordHash = await bcrypt.hash(data.Password,10)
       data.Password = passwordHash; 
       data.id_Rol = 1;
       const newUser = await prisma.usuario.create({ 
            data: data
       }) 

        const token = await CreateAccesToken({
        id: newUser.id,
        UserName: newUser.UserName
       })
>>>>>>> IvanDario
       
        res.cookie('token',token);
        res.status(201).send({
            UserName: data.UserName,
<<<<<<< HEAD
            Email: data.Email,     
        });

=======
            Email: data.Email,
            DateCreated: data.DateCreated           
        });
>>>>>>> IvanDario
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