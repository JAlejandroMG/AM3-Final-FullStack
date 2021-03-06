import express from "express";
import { userRole, getUsers, createUser, editUser, editUserRole, getUsersRoles } from "../controllers/users";
import { validate, userSchema, userEditSchema, roleUserSchema } from "../middlewares/validators";
import { isAdmin } from '../middlewares/roleAuth';
import JWT from "express-jwt"

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un usuario
router.post('/users', validate(userSchema), createUser);
//{ Obtiene todos los actores
router.get('/users', isAdmin(), getUsers);

//{ Modifica un usuario por id
router.put("users/:userId", validate(userEditSchema), editUser);

//{ Asigna un rol a un usuario
router.post("users/:userId/roles/:roleId", JWT(objJWT), userRole);
//{ Modifica un rol a un usuario
router.put("users/:userId/roles/:roleId", validate(roleUserSchema), editUserRole);

//{ Obtiene los roles de todos los usuarios
router.get("users/roles", getUsersRoles);



export default router;
