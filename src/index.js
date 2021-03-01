import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import authRouter from "./routes/auth";
import usersRouter from "./routes/users";
import rolesRouter from "./routes/roles";
// import { validateJWT } from "./middlewares/jwt.js"


const app = express();


//Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(authRouter);
app.use(usersRouter);
app.use(rolesRouter);

// app.use('/api/v1/');
// app.use(authRouter);

// app.use('api/v1/', authRouter);

// app.use("/api/v1", validateJWT, usersRouter);


app.get('/', (req, res) => {
   try{
      res.send("Bienvenido al proyecto final de Módulo 3 Academlo");
   }catch(error){
      console.log(error);
   }
});

export default app;
