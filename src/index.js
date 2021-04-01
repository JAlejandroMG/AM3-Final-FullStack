import express from 'express';
// import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
//*Routers
import actorsRouter from './routes/actors';
import directorsRouter from './routes/directors';
import genresRouter from './routes/genres';
import authRouter from "./routes/auth";
import contentsRouter from './routes/contents';
import rolesRouter from "./routes/roles";
import usersRouter from "./routes/users";


const app = express();


//*Middlewares
app.use(helmet());
// app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//*Routers
app.use('/api/v1', actorsRouter);
app.use('/api/v1', directorsRouter);
app.use('/api/v1', genresRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', contentsRouter);
app.use('/api/v1', rolesRouter);
app.use('/api/v1', usersRouter);


app.get('/', (req, res) => {
   try{
      res.send("Bienvenido al proyecto final del Módulo 3 (Node) de Academlo Fullstack.\nWellcome to the Module 3 (Node) final project from Academlo Fullstack Program\n\nPara hacer peticiones a la API-Rest, puede descargar el archivo Insomnia_2021-03-08 del repositorio de Github.\nTo make requests to the API-Rest, you can download the file Insomnia_202-03-08 from the Github repository.");
   }catch(error){
      console.log(error);
   }
});


export default app;
