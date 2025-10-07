import { PrismaClient } from '@prisma/client';

import { seedClient } from '#/infrastructure/database/prisma/seeds/seed-client';
import { seedOrder } from '#/infrastructure/database/prisma/seeds/seed-order';
import { seedOrderProduct } from '#/infrastructure/database/prisma/seeds/seed-order-product';
import { seedPayment } from '#/infrastructure/database/prisma/seeds/seed-payment';
import { seedProduct } from '#/infrastructure/database/prisma/seeds/seed-product';
import { seedProductCategory } from '#/infrastructure/database/prisma/seeds/seed-product-category';

console.log('Starting seeds...');
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
