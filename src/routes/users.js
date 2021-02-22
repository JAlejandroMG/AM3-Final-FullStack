import express from "express";
import { getUsers } from "../controllers/users";

const router = express.Router();

//Auth GetUser
router.get("/api/v1/users", getUsers);

export default router;