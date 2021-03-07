import { Actors, Contents } from "../models/";



//{ Crea un actor
export const createActor = async (req, res) => {
   const { name } = req.body;
   try{
      let newActor = await Actors.create({ name });
      return res.status(201).json({
         newActor,
         message: "Registro exitoso"
      });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Obtiene todos los actores
export const getActors = async (req,res) => {
   try{
      const results = await Actors.findAll({ attributes: ["id", "name"] });
      return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Obtiene un actor por id
export const getActorById = async (req,res) => {
   try{  
         const id = req.params.id;
         const results = await Actors.findOne({ where: { id }, attributes: ["id", "name"] });
         return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Modifica un actor por id
export const editActorById = async (req,res) => {
   try{  
         const id = req.params.id;
         const { name } = req.body;
         await Actors.update({ name }, { where: { id }});
         const results = await Actors.findOne({ where: { id }, attributes: ["id", "name"] });
         return res.status(201).json({
            results,
            message: "El registro del actor ha sido modificado"
         });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Elimina un actor por id
export const deleteActorById = async (req,res) => {
   try{  
      const id = req.params.id;
      console.log(1);
      await Actors.destroy({ 
         where: { id }
      }).then(result => {
         return res.status(200).json({
            message: "Se ha eliminado el registro"
         });
      }).catch(error => {
         console.log(error)
         return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
         })
      });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Obtiene el contenido por id de actor
export const getContentByActorById = async (req,res) => {
   try{
      const id = req.params.id;
      const results = await Actors.findOne({
         where: { id },
         attributes: ["id", "name"],
         include: [{
            model: Contents,
            attributes: ["id", "title", "description", "total_seasons"],
            through: { attributes: []},
         }] 
      });
      return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};
