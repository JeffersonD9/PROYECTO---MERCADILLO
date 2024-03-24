//import {CreateUser} from '../Services/ServicesLogin.js'
import {PrismaClient} from '@prisma/client'
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
         newUser = await prisma.usuario.create({
   
               data: data
          })  
          res.send("OK")
          console.log(newUser)  
       } catch (error) {    
           
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
   
            res.status(500).json({
                   error:{
                       message: 'Algo ha salido mal',
                   }
               })
           }
       }
}

export {AuthUser,Register}