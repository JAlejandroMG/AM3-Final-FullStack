import express from "express";
import { userRole, getUsers, createUser, editUser, editUserRole, getUsersRoles } from "../controllers/users";
import { validate, userSchema, userEditSchema, roleUserSchema } from "../middlewares/validators";
import { isEditor, isUser } from '../middlewares/roleAuth';
import JWT from "express-jwt";

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un usuario
router.post('/users/:userId', validate(userSchema), isEditor(), createUser);
//{ Obtiene todos los usuarios
router.get('/users/:userId', isUser(), getUsers);

//{ Modifica un usuario por id
router.put("/users/:id/:userId", validate(userEditSchema), isEditor(), editUser);

//{ Asigna un rol a un usuario
// router.post("/users/:userId/roles/:roleId", userRole);  //* Testing
router.post("/users/:userId/roles/:roleId", JWT(objJWT), userRole);  //* Production
//{ Modifica un rol a un usuario
router.put("/users/:userId/roles/:roleId", validate(roleUserSchema), editUserRole);

//{ Obtiene los roles de todos los usuarios
router.get("/users/roles/:userId", isUser(), getUsersRoles);



export default router;
