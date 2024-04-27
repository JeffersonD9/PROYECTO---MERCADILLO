import { CreateAccesToken } from "../Services/CreateToken.js";
import {
  SearchAdmin,
  ValidateSessionAdmin,
} from "../Services/ServicesAdmin.js";

export async function LoginAdmin(req, res) {
  
  const { Email, Password } = req.body;
  try {

    const userfound = await SearchAdmin(Email, Password);
    const role = userfound.id_Rol;
    const token = await CreateAccesToken({ id: userfound.id, role: role });

    res.cookie("token", token);
    res.status(201).send({
      Email: userfound.Email,
      redirect: "Admin",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

export async function ProfileAdmin(req, res) {
  try {
    const userFound = ValidateSessionAdmin(req);

    return res.render("administrador", {
      UserName: userFound.Email,
      loginPath: "/MercadilloBucaramanga/Admin",
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}


