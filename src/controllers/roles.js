import { Roles } from "../models/";


export const createRole = async (req, res) => {
   try{
      const { name } = req.body;
      let newRole = await Roles.create({ name });
      return res.status(201).json({
         newRole,
         message: "Registro exitoso!"
      });
   }catch(error){
      return res.status(400).json({
         message: "No se ha logrado registrar el rol en nuestro sistema"
      })
   }
};
