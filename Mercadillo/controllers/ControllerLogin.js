import {CreateUser} from '../Services/ServicesLogin.js'

async function AuthUser(req,res){

    const data = req.body
    try {
        
    } catch (error) {
        
    }
}

async function Register(req,res){

    const data = req.body

    try {       
      const newUser = await CreateUser(data)       
      console.log(newUser)
      res.send("Registrado")
    } catch (error) {
        
        console.log(error)
    }
}

export {AuthUser,Register}