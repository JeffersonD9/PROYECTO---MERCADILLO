import { SearchProduct } from "../Services/ServicesProducts";

export async function CreateCatalog(res) {
    try {
  
      console.log("Funciona");
      const productos = await SearchProduct();
      console.log(productos);
  
    } catch (error) {
      res.status(500).json({ message: error });
      console.log(error);
    }
  }