import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
//*Routers
import actorsRouter from './routes/actors';
import authRouter from "./routes/auth";
import contentsRouter from './routes/contents';
import rolesRouter from "./routes/roles";
import usersRouter from "./routes/users";


const app = express();


//*Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//*Routers
app.use('/api/v1', actorsRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', contentsRouter);
app.use('/api/v1', rolesRouter);
app.use('/api/v1', usersRouter);


app.get('/', (req, res) => {
   try{
      res.send("Bienvenido al proyecto final de Módulo 3 Academlo");
   }catch(error){
      console.log(error);
   }
});


export default app;
