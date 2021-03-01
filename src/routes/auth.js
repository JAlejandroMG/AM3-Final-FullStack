import express from "express";
import { login, signUp, reset, update } from "../controllers/auth";
import {validate, userSchema, loginSchema, updatePasswordSchema} from "../middlewares/validators";

const router = express.Router();

// Enrutando peticiones
router.post("/api/v1/signup", validate(userSchema), signUp);
router.post("/api/v1/login", validate(loginSchema), login);
router.post("/api/v1/reset-password", reset);
router.put('/api/v1/users/:userId/update-password', validate(updatePasswordSchema), update);

export default router;
