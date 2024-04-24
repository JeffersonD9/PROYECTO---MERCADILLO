import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

export async function CreateUser(data){

   const userCreate = await prisma.usuario.create({ 
        data: data
   }) 
   return userCreate
}

export async function EncryptPassword(password){

    const passwordHash = await bcrypt.hash(password,10)
    return passwordHash
}

export async function SearchUser(email){

    try {       
        const adminFound = await prisma.admin.findUnique({
            where:{
                Email:email
            }
        })
    
        const salesFound = await prisma.usuario.findUnique({
            where:{
                Email:email
            }
        })

        if (adminFound) {
            console.log("es Admin")
            return adminFound.id_Rol

        } else if (salesFound) {
            console.log("es Vendedor")
            return salesFound.id_Rol

        } else {

            return null;
        }
    } catch (error) {
        
        console.error("Error al buscar usuario:", error);
        throw error;
    }

}