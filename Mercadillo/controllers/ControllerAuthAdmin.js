import {PrismaClient} from '@prisma/client'
import { CreateAccesToken } from "../Services/CreateToken.js";
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

export async function LoginAdmin(req,res){
<<<<<<< HEAD

    const {Email, Password } = req.body;

    try {

        const userFound = await prisma.admin.findUnique({
            where: {
                Email: Email
=======
    const {email, password } = req.body;
    const passwordHash = await bcrypt.hash(password,10)
    console.log(req.body )
    try {
        const userFound = await prisma.admin.findUnique({
            where: {
                Email: email
>>>>>>> IvanDario
            }
        })
        if (!userFound) return res.status(400).json({ message: "Invalidate Credentials" });

<<<<<<< HEAD
        const ismatch = await bcrypt.compare(Password, userFound.Password);
=======
        const ismatch = await bcrypt.compare(password, userFound.Password);
        console.log(userFound.Password)
>>>>>>> IvanDario
        if (!ismatch) return res.status(400).json({ message: "Invalidate Credentials" });

        const role = userFound.id_Rol

        const token = await CreateAccesToken({ id: userFound.id, role: role});

        res.cookie('token', token);
        res.status(201).send({
            Email: userFound.Email,
        });

    } catch (error) {
<<<<<<< HEAD

        res.status(500).json({ message: error });
        console.log(error)
=======
        console.log("Error " +  error)
        res.status(500).json({ message: error });
        
>>>>>>> IvanDario
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