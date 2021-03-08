import express from "express";
import { createRole, editRole } from "../controllers/roles";
import { validate, roleSchema } from "../middlewares/validators";
import JWT from "express-jwt";

const router = express.Router();



const objJWT = {secret: process.env.SECRET_KEY, algorithms: ['HS384']};

//{ Crea un nuevo rol
// router.post('/roles',validate(roleSchema), createRole);  //* Testing
router.post('/roles', JWT(objJWT),validate(roleSchema), createRole);  //*Production

//{ Edita un role en base a su Id
router.put('/roles/:roleId', validate(roleSchema), editRole);



export default router;
