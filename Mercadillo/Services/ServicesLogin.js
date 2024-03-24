import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function CreateUser(data){
    try {

     return newUser = await  prisma.usuario.create({

            data: data
       })    
    } catch (error) {    
        
        if(error.code == 'P2002' && error.meta.target.includes('Usuario_UserName_key')){
            return{
                error:{
                    message: `El usuario ${data.UserName} ya existe`,
                    code: 'CONFLICT',
                    details: error.meta.target
                }
            }       

        }else if(error.code == 'P2002' && error.meta.target.includes('Usuario_Email_key')){
           return {
                error:{
                    message: `El correo ingresado ${data.Email} ya está registrado`,
                    code: 'CONFLICT',
                    details: error.meta.target
                }
            }
        }else{

            return{
                error:{
                    message: 'Algo ha salido mal',
                    details : error
                }
            }
        }
    }
   
}

export {CreateUser}