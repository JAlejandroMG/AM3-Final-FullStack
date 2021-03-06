import { Users, Roles, UserRoles } from "../models/";
import bcryptjs from "bcryptjs";
import {Op} from "sequelize";



//{ Crea un usuario
export const createUser = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try{
        const userExists = await Users.findOne({ where: { email } });
        console.log(userExists);
        if(!userExists) {
            let hashPassword = bcryptjs.hashSync(password, 10);
            let newUser = await Users.create({firstName, lastName, email, password: hashPassword });;
            return res.status(201).json({
                newUser,
                message: "Registro exitoso!"
            });
        } else {
            return res.status(400).json({
                message: "Hubo un error al tratar de registrar el usuario en el sistema"
            });
        }
    }catch(error){
        return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};



//{ Obtiene todos los usuarios
export const getUsers = async (req,res) => {
    try{
            const results = await Users.findAll();
            return res.status(200).json(results);
    }catch(error){
        console.log(error);
    }
}



//{ Edita un usuario por su Id
export const editUser = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const userId = req.params.id;
    try{
        await Users.update({ firstName, lastName, email }, { where: { id: userId }});
        const editedUser = await Users.findOne({ where: { id: userId } })
        return res.status(201).json({
            editedUser,
            message: "Se han hecho las modificaciones solicitadas"
        });
        
    }catch(error){
        return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};



//{ Asigna un rol a un usuario
export const userRole = async(req, res) => {
    const { userId, roleId } = req.params;
    try {
        //*Revisar si existen el usuario y el rol
        const userValid = await Users.findOne({ where: { id: userId }});
        const roleValid = await Roles.findOne({ where: { id: roleId }});
        //*Si ambos existen
        if(userValid && roleValid) {
            //*Insertar en la base de datos
            const results = await UserRoles.create({ userId, roleId });
            return res.status(201).json({
                message:  "El recurso se ha agregado satisfactoriamente",
                results
            });
        } else {
            return res.status(404).json({
                messsage: "No se ha logrado procesar la petición en nuestro sistema"
            });
        }        
    } catch (error) {
        return res.status(500).json({
            messsage: "No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};



//{ Modifica el rol de un usario
export const editUserRole = async(req, res) => {
    const { userId, roleId } = req.params;
    const newRoleId = req.body.roleId;
    try {
        //*Buscar la combinación de usuario y rol
        const userRole = await UserRoles.findOne({ where: {roleId, [Op.and]: { 
            userId
        }}});
        //*Si existe la combinación de usuario y rol
        if(userRole) {
            //*Revisar si existe el nuevo rol
            const roleValid = await Roles.findOne({ where: { id: newRoleId }});
            //*Si existe el rol
            if(roleValid) {
                //*Hacer la actualización en la BD
                await UserRoles.update( { roleId: newRoleId }, { where: { userId } } );
                return res.status(201).json({
                    message:  "Se ha hecho la modificación solicitada"
                });
            } else {
                return res.status(404).json({
                    messsage: "No se ha logrado procesar la petición en nuestro sistema"
                });
            }
        } else {
            return res.status(404).json({
                messsage: "No se ha logrado procesar la petición en nuestro sistema"
            });
        }    
    } catch (error) {
        return res.status(500).json({
            messsage: "No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};



//{ Obtiene los roles de todos los usuarios
export const getUsersRoles = async (req,res) => {
    try{
            const results = await Users.findAll({
                attributes: {
                    exclude: ["password", "createdAt", "updatedAt"]
                },
                include: [{
                    model: Roles,
                    attributes: ["id", "name"],
                    through: { attributes: [] }
                }]
            });
            /* const userRol = results.forEach(result => {
                console.log(result.firstName, result.lastName, result.Roles[0].name);
            }) */
            return res.status(200).json(results);
    }catch(error){
        console.log(error);
    }
};
