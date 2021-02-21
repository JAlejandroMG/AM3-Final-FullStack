import express from "express";
import { login, signUp } from "../controllers/auth";
import { getUsers } from "../controllers/users";
const router = express.Router();
//Enrutando peticiones 

//Auth Login & SignUp
router.post("/login", login);
router.post("/signup", signUp);

//Auth GetUser
router.get("/users", getUsers);


export default router;