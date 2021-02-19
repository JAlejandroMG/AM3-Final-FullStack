import { Users } from "../models/";
import bcryptjs from "bcryptjs";
import { generateJWT } from "../middlewares/jwt";

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


export const signUp = async (req, res) => {

}