import Joi from "joi";


const createContactValidation = Joi.object({
    first_name : Joi.string().max(100).required(),
    last_name : Joi.string().max(100).required(),
    email : Joi.string().max(200).email().optional(),
    phone : Joi.string().max(20).optional(),



})



export {
    createContactValidation
}