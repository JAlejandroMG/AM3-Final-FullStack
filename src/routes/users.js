import express from "express";
import { userRole, getUsers } from "../controllers/users";
import { validate, roleUserSchema } from "../middlewares/validators";
import JWT from "express-jwt"

const router = express.Router();


//Enrutando peticiones

router.post("/api/v1/users/:userId/roles/:rolesId", JWT({secret: process.env.SECRET_KEY, algorithms: ['HS384']}), validate(roleUserSchema), userRole);

router.get("/api/v1/users", JWT({secret: process.env.SECRET_KEY, algorithms: ['HS384']}), getUsers);


export default router;
