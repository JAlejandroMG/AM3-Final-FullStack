import express from "express";
import { createActor, getActors, getActorById, editActorById, deleteActorById } from '../controllers/actors';
import { isAdmin, isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un actor
router.post('/actors/:user', JWT(objJWT), isEditor(), createActor);
//{ Obtiene todos los actores
router.get('/actors/:user', JWT(objJWT), isUser(), getActors);

//{ Obtiene un actor por id
router.get('/actors/:id/:user', JWT(objJWT), isUser(), getActorById);
//{ Modifica un actor por id
router.put('/actors/:id/:user', JWT(objJWT), isEditor(), editActorById);
//{ Elimina un actor por id
router.delete('/actors/:id/:user', JWT(objJWT), isAdmin(), deleteActorById);

//{ Obtiene el contenido por un actor
router.get('/actors/:id/contents/:user', JWT(objJWT), isUser(), getActorById); //*FALTA



export default router;
