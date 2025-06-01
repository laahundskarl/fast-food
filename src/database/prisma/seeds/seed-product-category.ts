import { PrismaClient } from '@prisma/client';

export async function seedProductCategory(prismaClient: PrismaClient) {
    await prismaClient.productCategory.createMany({
        data: [
            {
                name: 'Sobremesa',
            },
            {
                name: 'Bebida',
            },
            {
                name: 'Pizza',
            },
            {
                name: 'Hambúrguer',
            },
        ],
    });
}
