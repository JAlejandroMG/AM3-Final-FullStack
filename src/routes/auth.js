import express from "express";
import { login, signUp } from "../controllers/auth";
import {validate, userSchema} from "../middlewares/validators";

const router = express.Router();

// Enrutando peticiones
router.post("/api/v1/login", login);
router.post("/api/v1/signup", validate(userSchema), signUp);

export default router;
