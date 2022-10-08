import * as Joi from "joi";

export const loadMedication = Joi.array().items({
    name: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9-_]{3,50}$'))
        .required(),
    weight: Joi.number()
        .min(1)
        .max(500)
        .required(),
    code: Joi.string()
        .pattern(new RegExp('^[A-Z0-9_]{3,20}$'))
        .required(),
    image: Joi.string()
        .required()

})