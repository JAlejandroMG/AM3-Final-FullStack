import express from "express";
import { login, signUp } from "../controllers/auth";
const router = express.Router();


//Enrutando peticiones 
router.post("/login", login);
router.post("/api/v1/signup", signUp);


export default router;