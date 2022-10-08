import { NextFunction, Request, Response } from "express";
import * as Joi from "joi";
import { ValidationErrorException } from "../utils/exceptions/validation-error.exception";
interface ValidatorArgs {
    body?: Joi.ObjectSchema<any> | Joi.ArraySchema;
    params?: Joi.ObjectSchema<any>
    query?: Joi.ObjectSchema<any>
}
export const validationMiddleware = ({ body, params, query }: ValidatorArgs) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error: paramsError } = (params) ? params.validate(req.params) : { error: null };
        const { error: bodyError } = (body) ? body.validate(req.body) : { error: null };
        const { error: queryError } = (query) ? query.validate(req.query) : { error: null };

        let errorType = '';
        if (paramsError) {
            errorType = 'params validation error';
        }

        if (bodyError) {
            errorType = 'body validation error';
        }

        if (queryError) {
            errorType = 'query validation error';
        }

        if (paramsError || bodyError || queryError) {
            const message = generateErrorMessage(paramsError || bodyError || queryError);
            throw new ValidationErrorException(message, errorType);
        }

        return next();
    };
}

function generateErrorMessage(error: Joi.ValidationError) {
    const { details } = error;
    const message = details.map(i => i.message).join(',');
    console.log("error", message);
    return message;
}