import { Users, UserRoles } from "../models/";


export const userRole = async(req, res) => {
    try {
        //Insertar en la base de datos
        console.log(req.body);
        let results = await UserRoles.create(req.body);
        res.json(results);
    } catch (error) {
        res.status(400).json({
            messsage: "No se pudo agregar un rol al usuario en el sistema"
        });
    }
}


//Get Users (Obtener todos los usuarios)
export const getUsers = async (req,res) => {
    try{
            const results = await Users.findAll();
            return res.status(200).json(results);
    }catch{
        console.log(error);
    }
}
