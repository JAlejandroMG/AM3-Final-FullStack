import { Roles } from "../models/";



//{ Crea nuevo rol
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



//{ Cambia nombre a rol
export const editRole = async (req, res) => {
   try{
      const { name } = req.body;
      const roleId = req.params.roleId;
      const roleExists = await Roles.findOne({ where: { id: roleId } });
      if(roleExists) {
         await Roles.update({ name }, { where: { id: roleId }});
         const editedRole = await Roles.findOne({ where: { id: roleId } })
         return res.status(201).json({
            editedRole,
            message:  "Se ha hecho la modificación solicitada"
         });
      } else {
         return res.status(404).json({
            message: "No se ha podido hacer la modificación solicitada"
         });
      }      
   }catch(error){
      return res.status(500).json({
         message: "No se ha podido hacer la modificación solicitada"
      })
   }
};
