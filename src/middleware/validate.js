import Joi from "joi"

export const RegistSchema = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().required().min(8),
    email:Joi.string().required()
})
export const LoginShema = Joi.object({
    username: Joi.string().required(),
    password:Joi.string().required().min(8),
})

export const passwordSchema = Joi.object({
    oldPassword:Joi.string().required(),
    newPassword:Joi.string().required()
})

export const postSchema = Joi.object({
    content:Joi.string().required()
})
export const validMiddleware = (schema)=>{
    return (req, res, next) => {
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400).json({"Validation Error": error.details[0].message })
        }
        next()
    }
}