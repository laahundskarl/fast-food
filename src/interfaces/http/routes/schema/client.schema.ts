// import { docsCreateClient } from '#/interfaces/http/routes/schema/docs/client.docs';
import { validatorCreateClient } from '#/interfaces/http/routes/schema/validator/client.validator';

export const schemaCreateClient = {
    summary: 'Register cliente',
    tags: ['client'],
    schema: {
        body: validatorCreateClient,
        // response: docsCreateClient,
    },
};
