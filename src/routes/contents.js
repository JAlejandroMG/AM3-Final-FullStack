import express from "express";
import { createContent, getContents, getContentById, editContentById, deleteContentById, getActorsByContentById, getDirectorsByContentById, getGenresByContentById } from '../controllers/contents';
import { isAdmin, isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea contenido
router.post('/contents/:userId', JWT(objJWT), isEditor(), createContent);
//{ Obtiene todo el contenido
router.get('/contents/:userId', JWT(objJWT), isUser(), getContents);

//{ Obtiene contenido por id
router.get('/contents/:id/:userId', JWT(objJWT), isUser(), getContentById);
//{ Modifica contenido por id
router.put('/contents/:id/:userId', JWT(objJWT), isEditor(), editContentById);
//{ Elimina contenido por id
router.delete('/contents/:id/:userId', JWT(objJWT), isAdmin(), deleteContentById);

//{ Obtiene los actores por contenido
router.get('/contents/:id/actors/:userId', JWT(objJWT), isUser(), getActorsByContentById);
//{ Obtiene los directores por contenido
router.get('/contents/:id/directors/:userId', JWT(objJWT), isUser(), getDirectorsByContentById);
//{ Obtiene los géneros por contenido
router.get('/contents/:id/genres/:userId', JWT(objJWT), isUser(), getGenresByContentById);



export default router;
