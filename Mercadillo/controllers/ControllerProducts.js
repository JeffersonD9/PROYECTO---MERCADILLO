import {PrismaClient} from '@prisma/client'
const prisma = new PrismaClient()

export async function CreateProduct(req,res){

    const data = req.body
    try {
        const newProduct = await prisma.productos.create({
            data: data
        })
        res.status(200).json(newProduct)
    } catch (error) {

        res.status(500).json({ message: error });
        console.log(error)
    }
}

export async function GetProductById(req,res){

    const id_categoria = parseInt(req.params.id_Categoria, 10)
    const id = parseInt(req.params.id, 10)
    try {

        const getProductById = await prisma.productos.findUnique({
            where: {id:id,id_Categoria:id_categoria},
        })
        res.status(200).json({ message: "Producto", data: getProductById });
    } catch (error) {
         res.status(500).json({ message: error });
         console.log(error)
    }
}

export async function GetProducts(req,res){
    try {
        const getProducts = await prisma.productos.findMany()
        res.status(200).json({ message: "Productos", data: getProducts });
        console.log(getProducts)
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

export async function DeleteProduct(req,res){

    const id_categoria = parseInt(req.params.id_Usuario, 10)
    const id = parseInt(req.params.id, 10)
    try {
        
        const deleteProduct = await prisma.productos.delete({

            where:{id:id, id_Categoria: id_categoria},
        })
        res.status(200).json({ message: "Producto Borrado", data: deleteProduct });
        
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

export async function UpdateProduct (req,res){

    const data = req.body
    const id = parseInt(req.params.id, 10)
    const id_categoria = parseInt(req.params.id_Categoria, 10)
    try {
        
        const updateProduct = await prisma.productos.update({
            where:{id:id, id_Categoria: id_categoria},
            data: data
        })
        
        res.status(200).json({ message: "Producto actualizado correctamente", data: updateProduct });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}