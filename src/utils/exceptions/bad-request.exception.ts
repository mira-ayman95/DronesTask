export class BadRequestException extends Error {
    status = 400;
    name = "Bad Request";
}