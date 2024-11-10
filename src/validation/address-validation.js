import Joi from "joi"


const createAddressValidation = Joi.object({
    street: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).optional(),
    postal_code: Joi.string().max(100).optional(),
    city: Joi.string().max(100).optional(),
    
})

const getAddressValidation = Joi.number().min(1).positive().required()


const updateAddressValidation = Joi.object({
    id : Joi.number().min(1).positive().required(),
    street: Joi.string().max(100).optional(),
    province: Joi.string().max(100).optional(),
    country: Joi.string().max(100).optional(),
    postal_code: Joi.string().max(100).optional(),
    city: Joi.string().max(100).optional(),
    
})





export {
    createAddressValidation,
    getAddressValidation,
    updateAddressValidation
}