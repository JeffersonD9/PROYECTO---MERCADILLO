import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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