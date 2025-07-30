import { OrderProduct } from '#/domain/entities/order-product.entity';
import { PrismaProductMapper } from '#/infrastructure/repositories/prisma/mappers/prisma-product.mapper';

export class PrismaOrderProductMapper {
    static toDomain(data: any): OrderProduct {
        return new OrderProduct({
            id: data.id,
            amount: data.amount,
            value: data.value,
            product: PrismaProductMapper.toDomain(data.product),
        });
    }
}
