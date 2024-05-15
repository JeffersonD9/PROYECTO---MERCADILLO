import { CreateAccesToken } from "../Services/CreateToken.js";
import { SearchUser,ValidateSessionAdmin } from "../Services/ServicesUser.js";
import { validatePassword } from "../Services/ServicesAdmin.js";
export async function LoginSalesman(req, res) {
  const { Email, Password } = req.body;

  try {
    const userFound = await SearchUser(Email);

    const passwordOk = await validatePassword(userFound, Password);
    if (!passwordOk)
      return res.status(400).json({ message: "Invalidate Credentials" });

    const token = await CreateAccesToken({ id: userFound.id, userName:userFound.UserName });

    res.cookie("token", token);
    res.status(201).send({
      UserName: userFound.UserName,
      redirect:"Usuario"
    });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
}
export async function ProfileSalesman(req, res) {
  try {
    console.log(req)
    const userFound = await ValidateSessionAdmin(req)
    if (!userFound) return res.status(400).json({ message: "User not Found" });
    return res.render("vendedor",{
      id: userFound.id,
      UserName: userFound.UserName,
      Email: userFound.Email,
      index:'Usuario'
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}
