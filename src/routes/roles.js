import express from "express";
import { createRole, editRole } from "../controllers/roles";
import { validate, roleSchema } from "../middlewares/validators";
import JWT from "express-jwt";

const router = express.Router();


// Enrutando peticiones
router.post("/api/v1/roles", JWT({secret: process.env.SECRET_KEY, algorithms: ['HS384']}),validate(roleSchema), createRole);

router.put("/api/v1/roles/:roleId", validate(roleSchema), editRole);


export default router;
