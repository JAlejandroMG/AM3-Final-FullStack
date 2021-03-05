import joi from "joi";
import spanishJoi from "../utils/spanish-joi-messages";



export const validate = (schema) => {
   return async (req, res, next) => {
      try {
         await schema.validateAsync(req.body);
         next();
      }catch (err) {
         console.log(err.details[0].context);
         res.status(400).json({
            message: err.message
         });
      }
   }
}



//{ Auth
export const loginSchema = joi.object({
   email: joi.string().required().email().label("email").messages(spanishJoi),
   password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).label("password").messages(spanishJoi)
});

export const updatePasswordSchema = joi.object({
   password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).label("password").messages(spanishJoi),
   token: joi.string().guid({ version: [ 'uuidv4' ] }).required().label("userId").messages(spanishJoi)
});



//{ Roles
export const roleUserSchema = joi.object({
   roleId: joi.number().integer().required().label("roleId").messages(spanishJoi)
});

export const roleSchema = joi.object({
   name: joi.string().required().pattern(new RegExp('^[a-zA-ZÀ-ÿ0-9 ]{6,30}$')).label("roleName").messages(spanishJoi)
});



//{ User - auth/signup - users/createUser
export const userSchema = joi.object({
   firstName: joi.string().required().pattern(new RegExp('^[a-zA-ZÀ-ÿ ]{3,30}$')).label("firstName").messages(spanishJoi),
   lastName: joi.string().required().pattern(new RegExp('^[a-zA-ZÀ-ÿ ]{3,30}$')).label("Apellido").messages(spanishJoi),
   email: joi.string().required().email().label("email").messages(spanishJoi),
   password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).label("password").messages(spanishJoi)
});

export const userEditSchema = joi.object({
   firstName: joi.string().required().pattern(new RegExp('^[a-zA-ZÀ-ÿ ]{3,30}$')).label("firstName").messages(spanishJoi),
   lastName: joi.string().required().pattern(new RegExp('^[a-zA-ZÀ-ÿ ]{3,30}$')).label("Apellido").messages(spanishJoi),
   email: joi.string().required().email().label("email").messages(spanishJoi),
});
