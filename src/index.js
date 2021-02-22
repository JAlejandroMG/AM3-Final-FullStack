import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth";
// import { validateJWT } from "./middlewares/jwt.js"

const app = express();

//Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(authRouter);
// app.use("/api/v1", validateJWT, usersRouter);



app.get('/', (req, res) => {
   try{
      res.send("Bienvenido al proyecto final de Módulo 3 Academlo");
   }catch(error){
      console.log(error);
   }
});

export default app;
