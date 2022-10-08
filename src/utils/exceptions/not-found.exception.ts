export class NotFoundException extends Error {
    status = 404;
    name = "Not Found";
}