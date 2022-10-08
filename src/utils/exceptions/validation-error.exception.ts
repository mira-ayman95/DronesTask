export class ValidationErrorException extends Error {
    status = 422;
    name = "Validation Error";
    errorType: string;
    constructor(message: string, errorType: string) {
        super(message);
        this.errorType = errorType;
    }
}