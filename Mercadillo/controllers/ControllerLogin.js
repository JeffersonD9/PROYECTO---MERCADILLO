import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import {CreateAccesToken} from "../JTW/Token.js"
const prisma = new PrismaClient()

async function AuthUser(req,res){
   
    const data = req.body
    try {
        
    } catch (error) {
        
    }
}

async function Register(req,res){
  
    const data = req.body

    try {    

       const passwordHash = await bcrypt.hash(data.Password,10)
       data.Password = passwordHash; 
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
            DateCreated: data.DateCreated           
        });
       } 
       catch (error) {    
           
           if(error.code == 'P2002' && error.meta.target.includes('Usuario_UserName_key')){
            res.status(409).send.json({
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
           }
       }
}

export {AuthUser,Register}