import * as Joi from "joi";

export const registerDrone = Joi.object()
    .keys({
        serialNum: Joi.string()
            .min(4)
            .max(100)
            .required(),
        weight: Joi.number()
            .integer()
            .min(1)
            .max(500)
            .required(),
        model: Joi.string().required().valid('lightWeight', 'middleWeight', 'cruiserWeight', 'heavyWeight'),
    })