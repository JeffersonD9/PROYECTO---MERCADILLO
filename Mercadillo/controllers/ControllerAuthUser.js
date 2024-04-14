import bcrypt from "bcrypt";
import { CreateAccesToken } from "../Services/CreateToken.js";
import {PrismaClient} from '@prisma/client'
import {LoginAdmin} from "../controllers/ControllerAuthAdmin.js"
const prisma = new PrismaClient()

async function Login(req,res){
    const rol = req.body.id_Rol
     if(rol == 1){

        LoginVendor(req,res)

     }
     else if( rol == 2){

        LoginAdmin(req,res)
     }
        
}
async function LoginVendor(req, res) {

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

async function LogOut(req,res){

    res.cookie('token', "",{
        expires : new Date(0)
    })

    return res.sendStatus(200)
}

async function ProfileSalesman(req,res){

    try {
        const userFound = await prisma.usuario.findUnique({
            where: {
                id: req.user.id
            }
        })
        if(!userFound) return res.send(400).json({ message: "User not Found"})

        return  res.json({

            id: userFound.id,
            UserName: userFound.UserName,
            Email: userFound.Email
        })
    } catch (error) {
        res.status(500).json({ message: error });
    }
}

export{Login, LogOut , ProfileSalesman}

