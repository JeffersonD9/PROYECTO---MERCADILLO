import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export async function SearchCategoria(categoria) {

  const buscarCategoria = await prisma.categorias.findUnique({
    where: {
      Nombre: categoria,
    },
  });

  
  return buscarCategoria
}