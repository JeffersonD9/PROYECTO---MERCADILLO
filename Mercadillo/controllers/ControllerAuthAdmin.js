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
    const token = await CreateAccesToken({ id: userfound.id, role: role });

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
    console.log(adminUserFound.Email);
    return res.render("administrador", {
      UserName: adminUserFound.Email,
      loginPath: "/MercadilloBucaramanga/Admin",
    });

  } catch (error) {
    
    res.status(500).json({ message: error.message });
  }
}