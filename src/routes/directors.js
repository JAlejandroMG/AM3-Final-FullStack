import express from "express";
import { createDirector, getDirectors, getDirectorById, editDirectorById, deleteDirectorById, getContentByDirectorById  } from '../controllers/directors';
import { isAdmin, isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();

const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un director
router.post('/directors/:userId', isEditor(), createDirector);  //*Tests
// router.post('/directors/:userId', JWT(objJWT), isEditor(), createDirector); //*Production

//{ Obtiene todos los directores
router.get('/directors/:userId', isUser(), getDirectors);
// router.get('/directors/:userId', JWT(objJWT), isUser(), getDirectors);

//{ Obtiene un director por id
router.get('/directors/:id/:userId', isUser(), getDirectorById);
// router.get('/directors/:id/:userId', JWT(objJWT), isUser(), getDirectorById);

//{ Modifica un director por id
router.put('/directors/:id/:userId', isEditor(), editDirectorById);
// router.put('/directors/:id/:userId', JWT(objJWT), isEditor(), editDirectorById);

//{ Elimina un director por id
router.delete('/directors/:id/:userId', isAdmin(), deleteDirectorById);
// router.delete('/directors/:id/:userId', JWT(objJWT), isAdmin(), deleteDirectorById);

//{ Obtiene el contenido por un director
router.get('/directors/:id/contents/:userId', isUser(), getContentByDirectorById);
// router.get('/directors/:id/contents/:userId', JWT(objJWT), isUser(), getContentByDirectorById);



export default router;