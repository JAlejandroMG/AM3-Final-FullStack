import express from "express";
import { createGenre, getGeners, getGenreById, editGenreById, deleteGenreById, getContentByGenreById  } from '../controllers/genres';
import { isAdmin, isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();

const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un genero
router.post('/genres/:userId', JWT(objJWT), isEditor(), createGenre);
//{ Obtiene todos los generos
router.get('/genres/:userId', JWT(objJWT), isUser(), getGeners);

//{ Obtiene un genero por id
router.get('/genres/:id/:userId', JWT(objJWT), isUser(), getGenreById);
//{ Modifica un director por id
router.put('/genres/:id/:userId', JWT(objJWT), isEditor(), editGenreById);
//{ Elimina un director por id
router.delete('/genres/:id/:userId', JWT(objJWT), isAdmin(), deleteGenreById);

//{ Obtiene el contenido por un genero
router.get('/genres/:id/contents/:userId', JWT(objJWT), isUser(), getContentByGenreById);



export default router;