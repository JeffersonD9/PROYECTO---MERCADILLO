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