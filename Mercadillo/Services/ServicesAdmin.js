
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

export async function SearchAdmin(Email, Password) {
  const userFound = await prisma.admin.findUnique({
    where: {
      Email: Email,
    },
  });

  if (!userFound) throw new Error("Invalid Credentials");

  const isMatch = await validatePassword(Password, userFound);
  if (!isMatch) throw new Error("Invalid Credentials");

  return userFound;
}

export async function validatePassword(Password, userFound) {
  const isMatch = await bcrypt.compare(Password, userFound.Password);
  if (!isMatch) return false;

  return true;
}

export async function ValidateSessionAdmin(req) {
  const userFound = await prisma.admin.findUnique({
    where: {
      id: req.user.id,
      Email: req.body.Email,
      id_Rol: req.user.role,
    },
  });
  if (!userFound) throw new Error("User not Found");
  else return userFound;
}
