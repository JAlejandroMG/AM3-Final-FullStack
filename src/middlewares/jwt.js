import jwt from "jsonwebtoken";

//Generate Tokens with generateJWT
export const generateJWT = (user) => {
    //SECRET KEY del Token y algoritmo de encriptacion
    const userObj = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    };
    const token = jwt.sign(userObj, process.env.SECRET_KEY, {algorithm: "HS384", expiresIn: "1h"});
    return token;
}