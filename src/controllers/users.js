import { Users } from "../models/";

//Get Users (Obtener todos los usuarios)
export const getUsers = async (req,res) => {
    const tokenVerify = await validateJWT(req,res);
    try{
        if(tokenVerify){
            const results = await Users.findAll();
            return res.status(200).json(results);
        }else{
            return res.status(401).json({message: 'Token inválido'});
        }
    }catch{
        console.log(error);
    }    
}

