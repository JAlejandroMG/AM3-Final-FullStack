import { Users, Roles } from '../models/';


const getRole = async (id) => {
   try{
      const role = await Users.findOne({ 
         where: { id },
         include: [{ model: Roles }]
      });
      const roleName = role.Roles[0].name;
      return roleName;
   }catch(error){
      console.log(error);
   }
};


export const isAdmin = () => {
   return async (req, res, next) => {
      try{
         const id = req.params.user;         
         const roleName = await getRole(id);
         if(roleName === "Administrador") {
            next();
         } else {
            res.json({
               message: "No tienes los permisos necesarios para acceder a los recursos"
         });
         }
      }catch(error){
         console.log(error);
         return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
         });
      }
   };
};


export const isEditor = () => {
   return async (req, res, next) => {
      try{
         const id = req.params.user;         
         const roleName = await getRole(id);
         if(roleName === "Editor" || roleName === "Administrador") {
            next();
         } else {
            res.json({
               message: "No tienes los permisos necesarios para acceder a los recursos"
         });
         }
      }catch(error){
         console.log(error);
         return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
         });
      }
   };
};


export const isUser = () => {
   return async (req, res, next) => {
      try{
         const id = req.params.user;         
         const roleName = await getRole(id);
         if(roleName === "Usuario" || roleName === "Editor" || roleName === "Administrador") {
            next();
         } else {
            res.json({
               message: "No tienes los permisos necesarios para acceder a los recursos"
         });
         }
      }catch(error){
         console.log(error);
         return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
         });
      }
   };
};
