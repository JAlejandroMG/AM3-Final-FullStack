import { Genres, Contents } from "../models/genres";

//{ Crea un genero
export const createGenre = async (req, res) => {
   const { name } = req.body;
   try{
      let newGenre = await Genres.create({ name });
      return res.status(201).json({
         newGenre,
         message: "Registro exitoso"
      });
   }catch(error){
      console.log(error);
      return res.status(500).json({
         message:"No se ha logrado procesar la petición en nuestro sistema"
      });
   }
};

//{ Obtiene todos los generos
export const getGeners = async (req,res) => {
    try{
       const results = await Genres.findAll({ attributes: ["id", "name"] });
       return res.status(200).json(results);
    }catch(error){
       console.log(error);
       return res.status(500).json({
          message:"No se ha logrado procesar la petición en nuestro sistema"
       });
    }
 };

 //{ Obtiene un genero por id
export const getGenreById = async (req,res) => {
    try{  
          const id = req.params.id;
          const results = await Genres.findOne({ where: { id }, attributes: ["id", "name"] });
          return res.status(200).json(results);
    }catch(error){
       console.log(error);
       return res.status(500).json({
          message:"No se ha logrado procesar la petición en nuestro sistema"
       });
    }
 };

 //{ Actualizar un genero por id
export const editGenreById = async (req,res) => {
    try{  
          const id = req.params.id;
          const { name } = req.body;
          await Genres.update({name}, { where: { id }});
          const results = await Genres.findOne({ where: { id }, attributes: ["id", "name"] });
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

//{ Elimina un genero por id
export const deleteGenreById = async (req,res) => {
    try{  
       const id = req.params.id;
       console.log(1);
       await Genres.destroy({ 
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

 //{ Obtiene el contenido de un genero por id
export const getContentByGenreById = async (req,res) => {
    try{
       const id = req.params.id;
       const results = await Genres.findOne({
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