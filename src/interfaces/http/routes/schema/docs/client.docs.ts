import { validatorCreateClient } from '#/interfaces/http/routes/schema/validator/client.validator';
import { validatorErrorResponseSwagger } from '#/interfaces/http/routes/schema/validator/error.validator';

export const docsCreateClient = {
    201: validatorCreateClient,
    400: validatorErrorResponseSwagger,
};
