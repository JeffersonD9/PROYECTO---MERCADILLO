
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export async function SearchAdmin(Email, Password) {
  console.log("Hola");
  const adminFound = await prisma.admin.findUnique({
    where: {
      Email: Email,
    },
  });
  //console.log(userFound);
  if (!adminFound) throw new Error("Invalid Credentials");

  const isMatch = await validatePassword(Password, adminFound);
  if (!isMatch) throw new Error("Invalid Credentials");

  return adminFound;
}

export async function validatePassword(Password, adminFound) {
  const isMatch = await bcrypt.compare(Password, adminFound.Password);
  if (!isMatch) return false;

  return true;
}

export async function ValidateSessionAdmin(req) {
  const adminFound = await prisma.admin.findUnique({
    where: {
      id: req.user.id,
      Email: req.body.Email,
      id_Rol: req.user.role,
    },
  });
  if (!adminFound) throw new Error("User not Found");
  
  return adminFound;
}
