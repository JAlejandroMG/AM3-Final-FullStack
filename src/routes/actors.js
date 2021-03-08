import express from "express";
import { createActor, getActors, getActorById, editActorById, deleteActorById, getContentByActorById } from '../controllers/actors';
import { isAdmin, isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un actor
router.post('/actors/:userId', isEditor(), createActor);  //*Tests
// router.post('/actors/:userId', JWT(objJWT), isEditor(), createActor);  //*Production
//{ Obtiene todos los actores
router.get('/actors/:userId', isUser(), getActors);
// router.get('/actors/:userId', JWT(objJWT), isUser(), getActors);

//{ Obtiene un actor por id
router.get('/actors/:id/:userId', isUser(), getActorById);
// router.get('/actors/:id/:userId', JWT(objJWT), isUser(), getActorById);
//{ Modifica un actor por id
router.put('/actors/:id/:userId', isEditor(), editActorById);
// router.put('/actors/:id/:userId', JWT(objJWT), isEditor(), editActorById);
//{ Elimina un actor por id
router.delete('/actors/:id/:userId', isAdmin(), deleteActorById);
// router.delete('/actors/:id/:userId', JWT(objJWT), isAdmin(), deleteActorById);

//{ Obtiene el contenido de un actor
router.get('/actors/:id/contents/:userId', isUser(), getContentByActorById);
// router.get('/actors/:id/contents/:userId', JWT(objJWT), isUser(), getContentByActorById);



export default router;
