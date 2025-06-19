import { Client } from '@prisma/client';

import { OrderWithRelations } from '#/types/order.type';

export type ClientWithRelations = Client & {
    orders?: OrderWithRelations[];
};
