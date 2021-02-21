import express from 'express';
import morgan from 'morgan';
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
   try{
      res.send("Bienvenido al proyecto final de Módulo 3 Academlo");
   }catch(error){
      console.log(error);
   }
});

export default app;
