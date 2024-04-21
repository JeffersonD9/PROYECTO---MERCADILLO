import bcrypt from "bcrypt";
import { CreateAccesToken } from "../Services/CreateToken.js";
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export async function LoginSalesman(req, res) {

    const { Email, Password } = req.body;

    try {

        const userFound = await prisma.usuario.findUnique({
            where: {
                Email: Email
            }
        })
        if (!userFound) return res.status(400).json({ message: "Invalidate Credentials" });

        const ismatch = await bcrypt.compare(Password, userFound.Password);
        if (!ismatch) return res.status(400).json({ message: "Invalidate Credentials" });

        const token = await CreateAccesToken({ id: userFound.id });

        res.cookie('token', token);
        res.status(201).send({
            UserName: userFound.UserName,
        });

    } catch (error) {
        res.status(500).json({ message: error });
        console.log(error)
    }
}
export async function ProfileSalesman(req,res){

    try {
        console.log(req.user)
        const userFound = await prisma.usuario.findUnique({
            where: {
                id: req.user.id,
                Email: req.body.Email,
                id_Rol: req.user.role
            }
        })
        if(!userFound) return res.status(400).json({ message: "User not Found"})

        return  res.json({
            id: userFound.id,
            UserName: userFound.UserName,
            Email: userFound.Email
        })

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}
