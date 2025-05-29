export class AppError extends Error {
    constructor(
        public message: string = 'Internal server error',
        public statusCode = 500,
        public code = 'InternalServerException',
    ) {
        super(message);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'NotFoundException') {
        super(message, 404, 'Not Found');
    }
}

export class ConflictError extends AppError {
    constructor(message = 'ConflictException') {
        super(message, 409, 'Conflict');
    }
}
