import {PrismaClient} from '@prisma/client'
import { CreateAccesToken } from "../Services/CreateToken.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

export async function LoginAdmin(req,res){

    const {Email, Password } = req.body;

    try {

        const userFound = await prisma.admin.findUnique({
            where: {
                Email: Email
            }
        })
        if (!userFound) return res.status(400).json({ message: "Invalidate Credentials - usuario desconocido" });
        const isMatch = await bcrypt.compare(Password, userFound.Password);
        
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials: contraseña incorrecta" });

        const role = userFound.id_Rol

        const token = await CreateAccesToken({ id: userFound.id, role: role});

        res.cookie('token', token);
        res.status(201).send({
            Email: userFound.Email,
        });

    } catch (error) {

        res.status(500).json({ message: error });
        console.log(error)
    }
}
export async function ProfileAdmin(req,res){

    try {
        const userFound = await prisma.admin.findUnique({
            where: {
                id: req.user.id,
                Email: req.user.Email
            }
        })
        if(!userFound) return res.send(400).json({ message: "User not Found"})

        return res.status(200).json({
            message: "User found"
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }

}