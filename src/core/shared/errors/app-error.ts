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
    constructor(message = 'NotFoundException') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'ConflictException') {
        super(message, 409);
    }
}
