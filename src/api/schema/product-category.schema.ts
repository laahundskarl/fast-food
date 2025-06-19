import { z } from 'zod';

import { productResponseSchema } from '#/api/schema/product.schema';

export const productCategoryResponseSchema = z.object({
    id: z.string().uuid(),
    name: z.string(),
    products: z.array(productResponseSchema),
});
