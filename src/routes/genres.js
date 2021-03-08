import express from "express";
import { createGenre, getGenres, getGenreById, editGenreById, deleteGenreById, getContentByGenreById  } from '../controllers/genres';
import { isAdmin, isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un genero
// router.post('/genres/:userId', isEditor(), createGenre);  //*Tests
router.post('/genres/:userId', JWT(objJWT), isEditor(), createGenre); //*Production

//{ Obtiene todos los generos
// router.get('/genres/:userId', isUser(), getGenres);
router.get('/genres/:userId', JWT(objJWT), isUser(), getGenres);

//{ Obtiene un genero por id
// router.get('/genres/:id/:userId', isUser(), getGenreById);
router.get('/genres/:id/:userId', JWT(objJWT), isUser(), getGenreById);

//{ Modifica un genero por id
// router.put('/genres/:id/:userId', isEditor(), editGenreById);
router.put('/genres/:id/:userId', JWT(objJWT), isEditor(), editGenreById);

//{ Elimina un genero por id
// router.delete('/genres/:id/:userId', isAdmin(), deleteGenreById);
router.delete('/genres/:id/:userId', JWT(objJWT), isAdmin(), deleteGenreById);

//{ Obtiene el contenido por un genero
// router.get('/genres/:id/contents/:userId', isUser(), getContentByGenreById);
router.get('/genres/:id/contents/:userId', JWT(objJWT), isUser(), getContentByGenreById);



export default router;
