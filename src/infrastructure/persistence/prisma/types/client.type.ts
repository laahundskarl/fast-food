import { Client } from '@prisma/client';

import { OrderWithRelations } from '#/infrastructure/persistence/prisma/types/order.type';

export type ClientWithRelations = Client & {
    orders?: OrderWithRelations[];
};
