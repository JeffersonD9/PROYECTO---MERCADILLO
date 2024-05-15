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
      UserName: adminUserFound.UserName,
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
      UserName: req.user,
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
    res.status(200).json({ message: "Usuario Borrado", data: resultado });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}
