import {CreateAccesToken} from "../Services/CreateToken.js"
import{EncryptPassword,CreateUser} from "../Services/ServicesUser.js"

async function Register(req,res){
  
    const data = req.body

    try {    

       data.Password = await EncryptPassword(data)
       data.id_Rol = 1;

       const newUser = await CreateUser(data)

       const token = await CreateAccesToken({
       id: newUser.id,
       UserName: newUser.UserName          })
       
        res.cookie('token',token);
        res.status(201).send({
            UserName: data.UserName,
            Email: data.Email,     
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