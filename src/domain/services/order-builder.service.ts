import { OrderStatus } from '@prisma/client';

import { OrderProduct } from '#/domain/entities/order-product.entity';
import { Order } from '#/domain/entities/order.entity';
import { Product } from '#/domain/entities/product.entity';
import { ProductValidationService } from '#/domain/services/product-validation.service';

export class OrderBuilderService {
    static buildOrderProducts(
        requestedProducts: Array<{ productId: string; quantity: number }>,
        availableProducts: Product[],
    ): { orderProducts: OrderProduct[]; totalValue: number } {
        let totalValue = 0;

        const orderProducts = requestedProducts.map(item => {
            const product = ProductValidationService.findProductById(item.productId, availableProducts);
            const itemValue = product.value * item.quantity;
            totalValue += itemValue;

            return new OrderProduct({
                amount: item.quantity,
                value: itemValue,
                product: product,
            });
        });

        return { orderProducts, totalValue };
    }

    static createOrder(orderProducts: OrderProduct[], totalValue: number): Order {
        return new Order({
            value: totalValue,
            orderNumber: 0,
            status: OrderStatus.WAITING,
            orderProducts: orderProducts,
        });
    }
}
