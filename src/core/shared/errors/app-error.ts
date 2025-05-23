export class AppError extends Error {
    constructor(
        public message: string,
        public statusCode = 500,
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(message, 404);
    }
}
