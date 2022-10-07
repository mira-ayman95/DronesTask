import * as Joi from "joi";

export const droneParams = Joi.object().keys({
    droneId: Joi.number()
        .integer()
        .required()
})