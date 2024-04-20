import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export async function CreateProduct(req,res){

    const data = req.body
    try {
        const newProduct = await prisma.
    } catch (error) {
        
    }
}