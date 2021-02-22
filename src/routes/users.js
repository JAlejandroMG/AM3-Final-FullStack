import express from "express";
import JWT from "express-jwt";
import { getUsers } from "../controllers/users";

const router = express.Router();

//Enrutando peticiones
router.get("/api/v1/users", JWT({secret: process.env.SECRET_KEY, algorithms: ['HS384']}), getUsers);


export default router;