import { Directors, Contents } from "../models/";

//{ Crea un director
export const createDirector = async (req, res) => {
   const { name } = req.body;
   try{
      let newDirector = await Directors.create({ name });
      return res.status(201).json({
         newDirector,
         message: "Registro exitoso"
      });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};

//{ Obtiene todos los directores
export const getDirectors = async (req,res) => {
   try{
      const results = await Directors.findAll({ attributes: ["id", "name"] });
      return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};

 //{ Obtiene un director por id
export const getDirectorById = async (req,res) => {
   try{  
         const id = req.params.id;
         const results = await Directors.findOne({ where: { id }, attributes: ["id", "name"] });
         return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};

 //{ Actualizar un director por id
export const editDirectorById = async (req,res) => {
   try{  
         const id = req.params.id;
         const { name } = req.body;
         await Directors.update({name}, { where: { id }});
         const results = await Directors.findOne({ where: { id }, attributes: ["id", "name"] });
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

//{ Elimina un director por id
export const deleteDirectorById = async (req,res) => {
   try{  
      const id = req.params.id;
      console.log(1);
      await Directors.destroy({ 
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

 //{ Obtiene el contenido de un director por id
export const getContentByDirectorById = async (req,res) => {
   try{
      const id = req.params.id;
      const results = await Directors.findOne({
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