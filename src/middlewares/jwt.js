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

<<<<<<< HEAD
// export const validateJWT = (req, res, next) => {
//     // const token = req.headers.authorization.split(" ")[1];
//     const bearerToken = req.headers['authorization'];
//     const token = bearerToken.split(" ")[1];
//     try {
//         const verified =  JWT.verify(token, process.env.SECRET_KEY);
//         next();
//         // return verified;
//     } catch (error) {
//         res.status(401).json({
//             message: "Token inválido"
//         });
//     }
// }
=======
/* export const validateJWT = (req, res, next) => {
    // const token = req.headers.authorization.split(" ")[1];
    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(" ")[1];
    try {
        const verified =  JWT.verify(token, process.env.SECRET_KEY);
        next();
        // return verified;
    } catch (error) {
        res.status(401).json({
            message: "Token inválido"
        });
    }
} */
>>>>>>> 4bcc26356046f14e38febd661ce744f0e9248b5d
