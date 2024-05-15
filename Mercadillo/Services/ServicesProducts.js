import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function CreateItem(data){

  const product = await prisma.productos.create({
    data: data,
  })
  return product
}

export async function SearchByIdItem(id_categoria,id){

 const productfound = prisma.productos.findUnique({
    where: {id:id,id_Categoria:id_categoria},
})
return productfound
}

export async function SearchsItems(){
  const getProducts = await prisma.productos.findMany()
  return getProducts
}

export async function DeleteItem(id_categoria,id){

  const deleteProduct = await prisma.productos.delete({
    where:{id:id, id_Categoria: id_categoria},
})
return deleteProduct
}

export async function UpdateItem(id_categoria,id,data){

  const updateProduct = await prisma.productos.update({
    where:{id:id, id_Categoria: id_categoria},
    data: data
})
return updateProduct
}

export async function SearchProduct() {

    const productsFound = await prisma.productos.findMany({
        include: {
          usuarios: {
            select: {
              Nombres: true
            }
          },
          categorias: {
            select: {
              Nombre: true
            }
          }
        }
      });

      return productsFound
  }