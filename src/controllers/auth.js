import { Users } from "../models/";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../middlewares/jwt";


//Users Login
export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const results = await Users.findOne({where: {email: email}});
        const valid = bcryptjs.compareSync(password, results.password);
        if(valid){
            const token = generateJWT(results);
            return res.status(200).json({
                message: "Credenciales correctas. Inicio de sesión exitoso!",
                token,
                user: results //Enviamos al cliente los resultados al mensaje del inicio de sesión
            });
        }else{
            return res.status(401).json({
                message:"Credenciales incorrectas. Fallo de contraseña"
            });
        }
    }catch(error){
        return res.status(401).json({
            message:"Credenciales incorrectas. No existe un usuario con estas credenciales"
        });
    }
}


//Users Register
export const signUp = async (req, res) => {
    try{
        const { firstName, lastName, email, password } = req.body;
        let hashPassword = bcryptjs.hashSync(password, 10);
        let newUser = await Users.create({firstName, lastName, email, password: hashPassword });
        return res.status(201).json({
            newUser,
            message: "Registro exitoso!"
        });
        
    }catch(error){
        return res.status(400).json({
            message: "No se ha logrado registrar el usuario en nuestro sistema"
        })
    }
}
