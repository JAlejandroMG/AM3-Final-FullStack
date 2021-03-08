import { Users, ResetTokens } from "../models/";
import { generateJWT } from "../middlewares/jwt";
import sendEmail from '../utils/nodemailer';
import bcryptjs from "bcryptjs";
import {Op} from "sequelize";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';



//{ Registra usuario
export const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    try{
        const userExists = await Users.findOne({ where: { email } });
        console.log(userExists);
        if(!userExists) {
            let hashPassword = bcryptjs.hashSync(password, 10);
            let newUser = await Users.create({firstName, lastName, email, password: hashPassword });;
            return res.status(201).json({
                newUser,
                message: "Registro exitoso!"
            });
        } else {
            return res.status(400).json({
                message: "Hubo un error al tratar de registrar el usuario en el sistema"
            });
        }
    }catch(error){
        return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};



//{ Da acceso a usuario
export const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const results = await Users.findOne({where: {email: email}});
        const valid = bcryptjs.compareSync(password, results.password);
        
        if(valid){
            const token = generateJWT(results);
            return res.status(200).json({
                user: results, //Enviamos al cliente los resultados al mensaje del inicio de sesión
                message: "Inicio de sesión exitoso!",
                token,
            });
        }else{
            return res.status(403).json({
                message:"Credenciales incorrectas, no se pudo procesar su petición"
            });
        }
    }catch(error){
        return res.status(404).json({
            message:"Credenciales incorrectas, no se pudo procesar su petición"
        });
    }
};



//{ Envia correo para cambiar contraseña
export const reset = async (req, res) => {
    const { email, password } = req.body;
    try{
        //* Revisar si usuario existe
        const user = await Users.findOne({ where: { email } });
        if(user) {
            //* Revisar si contraseña es válida
            const validPassword = bcryptjs.compareSync(password, user.password);
            //* Si contraseña es válida se genera token para reestablecerla
            if(validPassword) {
                //* Se genera token
                const token = uuidv4()
                //* Se crea registro
                const resetToken = {
                token,
                expirationDate: moment().add(2, 'hours'),
                userId: user.id
                }
                await ResetTokens.create(resetToken);
                //* Se envía correo
                sendEmail("kadoshrr2019@gmail.com", token, user.id )
                return res.status(202).json({
                    message: "Petición aceptada, se ha enviado un correo electrónico a su buzón de entrada"
                })
            }else {
                return res.status(401).json({
                    message: "Credenciales incorrectas, no se pudo procesar la petición"
                })
            };
        } else {
            return res.status(400).json({
                message: "Credenciales incorrectas, no se pudo procesar la petición"
            });
        }
    }catch(error){
        return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};



//{ Actualiza contraseña
export const update = async (req, res) => {
    const { password, token} = req.body;
    const userId = req.params.userId;
    console.log(userId, token, password);
    try{
        //* Validar que el userId y el token existan en el mismo registro
        const tokenObj = await ResetTokens.findOne({where: {token, [Op.and]: { 
            userId
        }}});
        if(tokenObj){
            //* Validar que el token no haya expirado
            // La fecha actual es menor a la fecha de expiracion?
            let validToken = moment().isBefore(tokenObj.expirationDate);
            //* Si el token está activo y no ha expirado
            if(tokenObj.active && validToken){
                //* Encriptar la nueva contraseña
                let hashPassword = bcryptjs.hashSync(password, 10);
                //*Cambiar la contrasena en la DB
                await Users.update({password: hashPassword}, {where: {id: tokenObj.userId}});
                //* Cambiar el estatus del token a false
                await ResetTokens.update({active: false}, {where: {id: tokenObj.id}});
                res.status(200).json({
                    message: "Se ha restablecido tu contraseña"
                });
            }
            return res.status(403).json({
                message: "Credenciales incorrectas, no se pudo procesar la petición"
            });
        }else{
            res.status(404).json({
                message: "Credenciales incorrectas, no se pudo procesar la petición"
            });
        }
    }catch(error){
        return res.status(500).json({
            message:"No se ha logrado procesar la petición en nuestro sistema"
        });
    }
};
