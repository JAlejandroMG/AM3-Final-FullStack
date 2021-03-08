import { Contents, Actors, Directors, Genres } from "../models/";



//{ Crea contenido
export const createContent = async (req, res) => {
   try{
      let newContent = await Contents.create(req.body);
      return res.status(201).json({
         newContent,
         message: "Registro exitoso"
      });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Obtiene todos los contenidos
export const getContents = async (req,res) => {
   try{
      const results = await Contents.findAll({ attributes: ["id", "title", "description", "total_seasons"] });
      return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Obtiene contenido por id
export const getContentById = async (req,res) => {
   try{  
         const id = req.params.id;
         const results = await Contents.findOne({ where: { id }, attributes: ["id", "title", "description", "total_seasons"] });
         return res.status(200).json(results);
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Modifica contenido por id
export const editContentById = async (req,res) => {
   try{  
         const id = req.params.id;
         await Contents.update(req.body, { where: { id }});
         const results = await Contents.findOne({ where: { id } });
         return res.status(200).json({
            results,
            message: "El registro del contenido ha sido modificado"
         });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};



//{ Elimina contenido por id
export const deleteContentById = async (req,res) => {
   try{  
      const id = req.params.id;
      console.log(1);
      await Contents.destroy({ 
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



//{ Obtiene los actores por id de contenido
export const getActorsByContentById = async (req,res) => {
   try{
      const id = req.params.id;
      const results = await Contents.findOne({
         where: { id },
         attributes: ["id", "title", "description", "total_seasons"],
         include: [{
            model: Actors,
            attributes: ["id", "name"],
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



//{ Obtiene los directores por d icontenido
export const getDirectorsByContentById = async (req,res) => {
   try{
      const id = req.params.id;
      const results = await Contents.findOne({
         where: { id },
         attributes: ["id", "title", "description", "total_seasons"],
         include: [{
            model: Directors,
            attributes: ["id", "name"],
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



//{ Obtiene los géneros por id de contenido
export const getGenresByContentById = async (req,res) => {
   try{
      const id = req.params.id;
      const results = await Contents.findOne({
         where: { id },
         attributes: ["id", "title", "description", "total_seasons"],
         include: [{
            model: Genres,
            attributes: ["id", "name"],
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
