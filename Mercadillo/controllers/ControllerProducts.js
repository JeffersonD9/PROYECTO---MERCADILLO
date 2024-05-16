import { CreateItem,SearchByIdItem,SearchsItems,DeleteItem,UpdateItem} from '../Services/ServicesProducts.js'

export async function CreateProduct(req,res){

    const data = req.body
    console.log(data)
    try {
        
        const newProduct = await CreateItem(data)
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

        const getProductById = await SearchByIdItem(id_categoria,id)
        res.status(200).json({ message: "Producto", data: getProductById })

    } catch (error) {
         res.status(500).json({ message: error });
         console.log(error)
    }
}

export async function GetProducts(req,res){
    try {

        const getProducts = await SearchsItems()
        
        //res.status(200).json({ message: "Productos", data: getProducts });
        const categoria = await prisma.categorias.findMany();

        res.render("Vendedor/vendedor", {
            UserName: req.user,
            body: "listaProductos",
            index: "Usuario",
            getProducts,
            categoria
          });



    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}

export async function DeleteProduct(req,res){

    const id_categoria = parseInt(req.params.id_Usuario, 10)
    const id = parseInt(req.params.id, 10)
    try {
        
        const deleteProduct = await DeleteItem(id_categoria,id)
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
        
        const updateProduct = await UpdateItem(id_categoria,id,data);
        
        res.status(200).json({ message: "Producto actualizado correctamente", data: updateProduct });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}