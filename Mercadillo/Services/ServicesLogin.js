import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

async function CreateUser(data){
    return prisma.usuario.create({

        data: data
   })
}

export {CreateUser}