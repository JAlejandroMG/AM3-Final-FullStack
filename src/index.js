import express from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
   try{
      res.send("Bienvenido al proyecto final de Módulo 3 Academlo");
   }catch(error){
      console.log(error);
   }
});

export default app;
