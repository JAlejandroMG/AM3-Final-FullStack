import express from "express";
import { login, signUp, reset, update } from "../controllers/auth";
import {validate, userSchema, loginSchema, updatePasswordSchema} from "../middlewares/validators";

const router = express.Router();



//{ Registra un nuevo usuario
router.post('/signup', validate(userSchema), signUp);
//{ Da acceso y crea token para usuario
router.post('/login', validate(loginSchema), login);

//{ Envía correo y crea token para actualizar contraseña
router.post('/reset-password', reset);
//{ Actualiza contraseña
router.put('/users/:userId/update-password', validate(updatePasswordSchema), update);



export default router;
