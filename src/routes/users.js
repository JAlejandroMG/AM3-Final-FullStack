import express from "express";
import { userRole, getUsers, createUser, editUser, editUserRole } from "../controllers/users";
import { validate, userSchema, userEditSchema, roleUserSchema } from "../middlewares/validators";
import JWT from "express-jwt"

const router = express.Router();


//Enrutando peticiones

router.get("/api/v1/users", JWT({secret: process.env.SECRET_KEY, algorithms: ['HS384']}), getUsers);

router.post("/api/v1/users", validate(userSchema), createUser);

router.put("/api/v1/users/:userId", validate(userEditSchema), editUser);

router.post("/api/v1/users/:userId/roles/:roleId", JWT({secret: process.env.SECRET_KEY, algorithms: ['HS384']}), userRole);

router.put("/api/v1/users/:userId/roles/:roleId", validate(roleUserSchema), editUserRole);


export default router;
