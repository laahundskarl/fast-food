import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '#/domain/errors';
import { IValidatorTokenService } from '#/domain/services/validator-token.service';
import { env } from '#/infrastructure/config/env';

export class JwtValidatorTokenService implements IValidatorTokenService {
    private readonly secret = env.JWT_SECRET;

    validate(token: string): void {
        try {
            jwt.verify(token, this.secret);
        } catch (error) {
            console.error('Error validating token:', error);
            throw new UnauthorizedError('Invalid token');
        }
    }
}
