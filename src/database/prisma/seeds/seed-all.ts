import { PrismaClient } from '@prisma/client';
import { seedClient } from './seeds-client';
import { seedProduct } from './seeds-product';
import { seedProductCategory } from './seeds-product-category';
import { seedOrder } from './seed-order';
import { seedOrderProduct } from './seed-order-product';
import { seedPayment } from './seed-payment';

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
