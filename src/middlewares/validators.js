import joi from "joi";
import spanishJoi from "../utilities/spanish-joi-messages";



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


export const roleUserSchema = joi.object({
   userId: joi.number().integer().required().label("userId").messages(spanishJoi),
   roleId: joi.number().integer().required().label("roleId").messages(spanishJoi)
});

export const roleSchema = joi.object({
   name: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{8,50}$')).label("roleName").messages(spanishJoi)
});

export const userSchema = joi.object({
   firstName: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label("firstName").messages(spanishJoi),
   lastName: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label("lastName").messages(spanishJoi),
   email: joi.string().required().email().label("email").messages(spanishJoi),
   password: joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).label("password").messages(spanishJoi)});