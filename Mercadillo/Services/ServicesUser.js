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
    
        const salesFound = await prisma.admin.findUnique({
            where:{
                Email:email
            }
        })

        if (adminFound) {

            return {
                user:adminFound
            }

        } else if (salesFound) {

            return {
                user:salesFound
            }

        } else {

            return null;
        }
    } catch (error) {
        
        console.error("Error al buscar usuario:", error);
        throw error;
    }

}