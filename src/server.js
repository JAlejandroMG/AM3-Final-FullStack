import app from "./index.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () =>{
   console.log("El Servidor está escuchando sobre el puerto", PORT);
})
