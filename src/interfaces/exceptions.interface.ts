export interface GlobalError extends Error {
    status?: number;
    errorType?: string;
}