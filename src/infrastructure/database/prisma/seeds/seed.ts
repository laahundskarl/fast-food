import { PrismaClient } from '@prisma/client';

import { logger } from '#/infrastructure/config/logger';
import { seedClient } from '#/database/prisma/seeds/seed-client';
import { seedOrder } from '#/database/prisma/seeds/seed-order';
import { seedOrderProduct } from '#/database/prisma/seeds/seed-order-product';
import { seedPayment } from '#/database/prisma/seeds/seed-payment';
import { seedProduct } from '#/database/prisma/seeds/seed-product';
import { seedProductCategory } from '#/database/prisma/seeds/seed-product-category';

logger.info('Starting seeds...');
const prismaClient = new PrismaClient();

async function main() {
    //clear all data
    await prismaClient.orderProduct.deleteMany();
    await prismaClient.payment.deleteMany();
    await prismaClient.order.deleteMany();
    await prismaClient.product.deleteMany();
    await prismaClient.productCategory.deleteMany();
    await prismaClient.client.deleteMany();

    await seedClient(prismaClient);
    await seedProductCategory(prismaClient);
    await seedProduct(prismaClient);
    await seedOrder(prismaClient);
    await seedOrderProduct(prismaClient);
    await seedPayment(prismaClient);
}

main();
