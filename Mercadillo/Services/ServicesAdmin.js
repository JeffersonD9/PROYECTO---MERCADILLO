import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export async function SearchAdmin(Email) {

  const userFound = await prisma.admin.findUnique({
    where: {
      Email: Email,
    },
  });
  return userFound
}

export async function validatePassword(userFound, Password) {

  const ismatch = await bcrypt.compare(Password, userFound.Password);
  return ismatch
}

export async function ValidateSessionAdmin(req) {

  const adminFound = await prisma.admin.findUnique({
    where: {
      id: req.user.id,
      Email: req.body.Email,
      id_Rol: req.user.role,
    },
  });
  
  return adminFound;
}
