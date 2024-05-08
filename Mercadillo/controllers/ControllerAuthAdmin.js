import { CreateAccesToken } from "../Services/CreateToken.js";
import {
  SearchAdmin,
  validatePassword,
  ValidateSessionAdmin,
} from "../Services/ServicesAdmin.js";

export async function LoginAdmin(req, res) {
  const { Email, Password } = req.body;
  try {
    const userfound = await SearchAdmin(Email);
    const passwordOk = await validatePassword(userfound, Password);
    if (!passwordOk)
      return res.status(400).json({ message: "Invalidate Credentials" });
    const role = userfound.id_Rol;

    const token = await CreateAccesToken({
      id: userfound.id,
      role: role,
      userName: userfound.UserName,
    });
    res.cookie("token", token);
    res.status(201).send({
      Email: userfound.Email,
      redirect: "Admin",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function ProfileAdmin(req, res) {
  try {
    const adminUserFound = await ValidateSessionAdmin(req);
    if (!adminUserFound) res.status(401).json({ message: "User not Found" });
    return res.render("Administrador/administrador", {
      UserName: adminUserFound.Email,
      index: "Admin",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

/* ***** ** *** * ***/
import { PrismaClient } from "@prisma/client";
import { SearchCategoria } from "../Services/ServicesCategoria.js";
const prisma = new PrismaClient();
export async function MostrarUsuarios(req, res) {
  try {
    const usuarios = await prisma.usuario.findMany();
    if (!usuarios) res.status(401).json({ message: "User not Found" });
    res.render("Administrador/administrador", {
      UserName: req.user.userName,
      body: "listaUsuario",
      usuarios,
      index: "Admin",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function EliminarUsuario(req, res) {
  const id_usuario = parseInt(req.params.id_usuario, 10);
  try {
    const resultado = await prisma.usuario.delete({
      where: {
        id: id_usuario,
      },
    });
    res.status(200).json({ message: "Producto Borrado", data: resultado });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}

export async function EliminarCategoria(req, res) {
  const id_categoria = parseInt(req.params.id_categoria, 10);
  try {
    const data = await prisma.categorias.delete({
      where: {
        id: id_categoria,
      },
    });
    res.status(200).json({ message: "Producto Borrado", data: data });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}

export async function MostrarCategorias(req, res) {
  try {
    //Mostrar los categorias por cataglo
    const categoriasConCatalogo = await prisma.categorias.findMany({
      include: {
        catalogos: true, // Incluir el catálogo relacionado
      },
      orderBy: {
        id: 'desc', // Ordenar por id de forma descendente para obtener los últimos registros
      },
    });
    console.log(categoriasConCatalogo);

    //Traer los catalogos para mostrarlos en el select
    const catalogos = await prisma.catalogos.findMany();

    res.render("Administrador/administrador", {
      UserName: req.user.userName,
      body: "categoria",
      index: "Admin",
      categoriasConCatalogo,
      catalogos, //Todos los catalogos
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}

export async function CrearCategorias(req, res) {
  const { Nombre, id_Cat } = req.body;
  try {
    const encontrarCategoria = await SearchCategoria(Nombre);
    if (encontrarCategoria) {
      return res
        .status(400)
        .json({ message: "La categoria ya se encuentra creada" });
    }

    const categorias = await prisma.categorias.create({
      data: {
        Nombre: Nombre,
        id_Cat: id_Cat,
      },
    });
    res
      .status(200)
      .json({ message: "Categoria Creada", categorias: categorias });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}

export async function ActualizarCategorias(req, res) {
  const { Nombre, id_Cat } = req.body;
  const id_categoria = parseInt(req.params.id_categoria, 10);

  try {
    const encontrarCategoria = await SearchCategoria(Nombre);
    if (encontrarCategoria) {
      return res
        .status(400)
        .json({ message: "No se puede actualizar por que ya existe" });
    }
    const actualizarCategoria = await prisma.categorias.update({
      where: { id: id_categoria },
      data: {
        Nombre: Nombre,
        id_Cat: id_Cat,
      },
    });
    res.status(200).json({
      message: "Producto actualizado correctamente",
      data: actualizarCategoria,
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}
