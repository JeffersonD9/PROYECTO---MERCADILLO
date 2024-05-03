import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

export async function CreateUser(data){

   const userCreate = await prisma.usuario.create({ 
        data: data
   }) 
   return userCreate
}
export async function SearchUser() {

    const userFound = await prisma.usuario.findMany()
    return userFound
  }

export async function EncryptPassword(password){

    const passwordHash = await bcrypt.hash(password,10)
    return passwordHash
}

export async function ValidateSessionAdmin(req) {

    const userFound = await prisma.usuario.findUnique({
      where: {
        id: req.user.id,
        Email: req.body.Email,
        id_Rol: req.user.role,
      },
    });
    
    return userFound;
  }