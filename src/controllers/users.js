import { Users } from "../models";

//Get Users (Obtener todos los usuarios)
export const getUsers = async (req,res) => {
   try{
        const results = await Users.findAll();
        return res.status(200).json(results);
        
    }catch{
        console.log(error);
    }    
}

