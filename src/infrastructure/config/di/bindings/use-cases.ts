import { Container } from 'inversify';

import { CreateClient } from '#/application/use-cases/client/create-client/create-client';
import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { DeleteClient } from '#/application/use-cases/client/delete-client/delete-client';
import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { GetClient } from '#/application/use-cases/client/get-client/get-client';
import { IGetClientUseCase } from '#/application/use-cases/client/get-client/get-client.use-case';
import { GetClientOrders } from '#/application/use-cases/client/get-client-orders/get-client-orders';
import { IGetClientOrdersUseCase } from '#/application/use-cases/client/get-client-orders/get-client-orders.use-case';
import { UpdateClient } from '#/application/use-cases/client/update-client/update-client';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
import { Identify } from '#/application/use-cases/identify/identify';
import { IIdentifyUseCase } from '#/application/use-cases/identify/identify.use-case';
import { CreateOrder } from '#/application/use-cases/order/create-order/create-order';
import { ICreateOrderUseCase } from '#/application/use-cases/order/create-order/create-order.use-case';
import { DeleteOrder } from '#/application/use-cases/order/delete-order/delete-order';
import { IDeleteOrderUseCase } from '#/application/use-cases/order/delete-order/delete-order.use-case';
import { GetOrder } from '#/application/use-cases/order/get-order/get-order';
import { IGetOrderUseCase } from '#/application/use-cases/order/get-order/get-order.use-case';
import { ListOrder } from '#/application/use-cases/order/list-order/list-order';
import { IListOrderUseCase } from '#/application/use-cases/order/list-order/list-order.use-case';
import { UpdateOrder } from '#/application/use-cases/order/update-order/update-order';
import { IUpdateOrderUseCase } from '#/application/use-cases/order/update-order/update-order.use-case';
import { UpdateOrderStatus } from '#/application/use-cases/order/update-order-status/update-order-status';
import { IUpdateOrderStatusUseCase } from '#/application/use-cases/order/update-order-status/update-order-status.use-case';
import { GetPayment } from '#/application/use-cases/payment/get-payment/get-payment';
import { IGetPaymentUseCase } from '#/application/use-cases/payment/get-payment/get-payment.use-case';
import { ListPayment } from '#/application/use-cases/payment/list-payment/list-payment';
import { IListPaymentUseCase } from '#/application/use-cases/payment/list-payment/list-payment.use-case';
import { CreateProduct } from '#/application/use-cases/product/create-product/create-product';
import { ICreateProductUseCase } from '#/application/use-cases/product/create-product/create-product.use-case';
import { DeleteProduct } from '#/application/use-cases/product/delete-product/delete-product';
import { IDeleteProductUseCase } from '#/application/use-cases/product/delete-product/delete-product.use-case';
import { GetProduct } from '#/application/use-cases/product/get-product/get-product';
import { IGetProductUseCase } from '#/application/use-cases/product/get-product/get-product.use-case';
import { ListProduct } from '#/application/use-cases/product/list-product/list-product';
import { IListProductUseCase } from '#/application/use-cases/product/list-product/list-product.use-case';
import { UpdateProduct } from '#/application/use-cases/product/update-product/update-product';
import { IUpdateProductUseCase } from '#/application/use-cases/product/update-product/update-product.use-case';
import { GetProductCategory } from '#/application/use-cases/product-category/get-product-category/get-product-category';
import { IGetProductCategoryUseCase } from '#/application/use-cases/product-category/get-product-category/get-product-category.use-case';
import { ListProductCategory } from '#/application/use-cases/product-category/list-product-category/list-product-category';
import { IListProductCategoryUseCase } from '#/application/use-cases/product-category/list-product-category/list-product-category.use-case';
import { TYPES } from '#/infrastructure/config/di/types';

export function bindUseCases(container: Container) {
    container.bind<ICreateClientUseCase>(TYPES.CreateClientUseCase).to(CreateClient).inTransientScope();
    container.bind<IDeleteClientUseCase>(TYPES.DeleteClientUseCase).to(DeleteClient).inTransientScope();
    container.bind<IGetClientUseCase>(TYPES.GetClientUseCase).to(GetClient).inTransientScope();
    container.bind<IGetClientOrdersUseCase>(TYPES.GetClientOrdersUseCase).to(GetClientOrders).inTransientScope();
    container.bind<IUpdateClientUseCase>(TYPES.UpdateClientUseCase).to(UpdateClient).inTransientScope();

    container.bind<IIdentifyUseCase>(TYPES.IdentifyUseCase).to(Identify).inTransientScope();

    container.bind<ICreateOrderUseCase>(TYPES.CreateOrderUseCase).to(CreateOrder).inTransientScope();
    container.bind<IDeleteOrderUseCase>(TYPES.DeleteOrderUseCase).to(DeleteOrder).inTransientScope();
    container.bind<IGetOrderUseCase>(TYPES.GetOrderUseCase).to(GetOrder).inTransientScope();
    container.bind<IListOrderUseCase>(TYPES.ListOrderUseCase).to(ListOrder).inTransientScope();
    container.bind<IUpdateOrderUseCase>(TYPES.UpdateOrderUseCase).to(UpdateOrder).inTransientScope();
    container.bind<IUpdateOrderStatusUseCase>(TYPES.UpdateOrderStatusUseCase).to(UpdateOrderStatus).inTransientScope();

    container.bind<IGetPaymentUseCase>(TYPES.GetPaymentUseCase).to(GetPayment).inTransientScope();
    container.bind<IListPaymentUseCase>(TYPES.ListPaymentUseCase).to(ListPayment).inTransientScope();

    container.bind<ICreateProductUseCase>(TYPES.CreateProductUseCase).to(CreateProduct).inTransientScope();
    container.bind<IDeleteProductUseCase>(TYPES.DeleteProductUseCase).to(DeleteProduct).inTransientScope();
    container.bind<IGetProductUseCase>(TYPES.GetProductUseCase).to(GetProduct).inTransientScope();
    container.bind<IListProductUseCase>(TYPES.ListProductUseCase).to(ListProduct).inTransientScope();
    container.bind<IUpdateProductUseCase>(TYPES.UpdateProductUseCase).to(UpdateProduct).inTransientScope();

    container
        .bind<IGetProductCategoryUseCase>(TYPES.GetProductCategoryUseCase)
        .to(GetProductCategory)
        .inTransientScope();
    container
        .bind<IListProductCategoryUseCase>(TYPES.ListProductCategoryUseCase)
        .to(ListProductCategory)
        .inTransientScope();
}
