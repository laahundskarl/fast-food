import { PrismaClient } from '@prisma/client';
import { Container } from 'inversify';

import { ClientOrchestrationService } from '#/application/services/client-orchestration.service';
import { PaymentOrchestrationService } from '#/application/services/payment-orchestration.service';
import { ProductOrchestrationService } from '#/application/services/product-orchestration.service';
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
import { IWebhookHandlerUseCase } from '#/application/use-cases/gateway/webhook-handler';
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
import { GetPayment } from '#/application/use-cases/payment/get-payment/get-payment';
import { IGetPaymentUseCase } from '#/application/use-cases/payment/get-payment/get-payment.use-case';
import { ListPayment } from '#/application/use-cases/payment/list-payment/list-payment';
import { IListPaymentUseCase } from '#/application/use-cases/payment/list-payment/list-payment.use-case';
import { UpdatePayment } from '#/application/use-cases/payment/update-payment/update-payment';
import { IUpdatePaymentUseCase } from '#/application/use-cases/payment/update-payment/update-payment.use-case';
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
import { ICreatePayment } from '#/domain/gateways/create-payment';
import { IGetPayment } from '#/domain/gateways/get-payment';
import { IClientRepository } from '#/domain/repositories/client.repository';
import { IOrderRepository } from '#/domain/repositories/order.repository';
import { IPaymentRepository } from '#/domain/repositories/payment.repository';
import { IProductCategoryRepository } from '#/domain/repositories/product-category.repository';
import { IProductRepository } from '#/domain/repositories/product.repository';
import { TYPES } from '#/infrastructure/config/types';
import { MercadoPagoCreatePayment } from '#/infrastructure/gateways/mercado-pago/mercado-pago-create-payment';
import { MercadoPagoGetPayment } from '#/infrastructure/gateways/mercado-pago/mercado-pago-get-payment';
import { PrismaClientRepository } from '#/infrastructure/repositories/prisma/prisma-client.repository';
import { PrismaOrderRepository } from '#/infrastructure/repositories/prisma/prisma-order.repository';
import { PrismaPaymentRepository } from '#/infrastructure/repositories/prisma/prisma-payment.repository';
import { PrismaProductCategoryRepository } from '#/infrastructure/repositories/prisma/prisma-product-category.repository';
import { PrismaProductRepository } from '#/infrastructure/repositories/prisma/prisma-product.repository';
import { MercadoPagoWebhookHandlerUseCase } from '#/infrastructure/webhooks/mercado-pago';
import { ClientController } from '#/interfaces/controller/client.controller';
import { IdentifyController } from '#/interfaces/controller/identify.controller';
import { OrderController } from '#/interfaces/controller/order.controller';
import { PaymentController } from '#/interfaces/controller/payment.controller';
import { ProductCategoryController } from '#/interfaces/controller/product-category.controller';
import { ProductController } from '#/interfaces/controller/product.controller';
import { WebhookController } from '#/interfaces/controller/webhook.controller';

const container = new Container();

// PrismaClient
container
    .bind<PrismaClient>(TYPES.PrismaClient)
    .toDynamicValue(() => {
        return new PrismaClient();
    })
    .inSingletonScope();

// Repositories
container.bind<IClientRepository>(TYPES.ClientRepository).to(PrismaClientRepository).inSingletonScope();
container.bind<IOrderRepository>(TYPES.OrderRepository).to(PrismaOrderRepository).inSingletonScope();
container.bind<IPaymentRepository>(TYPES.PaymentRepository).to(PrismaPaymentRepository).inSingletonScope();
container
    .bind<IProductCategoryRepository>(TYPES.ProductCategoryRepository)
    .to(PrismaProductCategoryRepository)
    .inSingletonScope();
container.bind<IProductRepository>(TYPES.ProductRepository).to(PrismaProductRepository).inSingletonScope();

// Use Cases
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

container.bind<IGetPaymentUseCase>(TYPES.GetPaymentUseCase).to(GetPayment).inTransientScope();
container.bind<IListPaymentUseCase>(TYPES.ListPaymentUseCase).to(ListPayment).inTransientScope();
container.bind<IUpdatePaymentUseCase>(TYPES.UpdatePaymentUseCase).to(UpdatePayment).inTransientScope();

container.bind<ICreateProductUseCase>(TYPES.CreateProductUseCase).to(CreateProduct).inTransientScope();
container.bind<IDeleteProductUseCase>(TYPES.DeleteProductUseCase).to(DeleteProduct).inTransientScope();
container.bind<IGetProductUseCase>(TYPES.GetProductUseCase).to(GetProduct).inTransientScope();
container.bind<IListProductUseCase>(TYPES.ListProductUseCase).to(ListProduct).inTransientScope();
container.bind<IUpdateProductUseCase>(TYPES.UpdateProductUseCase).to(UpdateProduct).inTransientScope();

container.bind<IGetProductCategoryUseCase>(TYPES.GetProductCategoryUseCase).to(GetProductCategory).inTransientScope();
container
    .bind<IListProductCategoryUseCase>(TYPES.ListProductCategoryUseCase)
    .to(ListProductCategory)
    .inTransientScope();

// Controllers
container.bind<ClientController>(TYPES.ClientController).to(ClientController).inTransientScope();
container.bind<IdentifyController>(TYPES.IdentifyController).to(IdentifyController).inTransientScope();
container.bind<OrderController>(TYPES.OrderController).to(OrderController).inTransientScope();
container.bind<PaymentController>(TYPES.PaymentController).to(PaymentController).inTransientScope();
container
    .bind<ProductCategoryController>(TYPES.ProductCategoryController)
    .to(ProductCategoryController)
    .inTransientScope();
container.bind<ProductController>(TYPES.ProductController).to(ProductController).inTransientScope();

// Gateways
container.bind<ICreatePayment>(TYPES.CreatePaymentGateway).to(MercadoPagoCreatePayment).inSingletonScope();
container.bind<IGetPayment>(TYPES.GetPaymentGateway).to(MercadoPagoGetPayment).inSingletonScope();

// Application Services
container.bind<ProductOrchestrationService>(TYPES.ProductOrchestrationService).to(ProductOrchestrationService);
container.bind<ClientOrchestrationService>(TYPES.ClientOrchestrationService).to(ClientOrchestrationService);
container.bind<PaymentOrchestrationService>(TYPES.PaymentOrchestrationService).to(PaymentOrchestrationService);

// Webhook
container.bind<IWebhookHandlerUseCase>(TYPES.WebhookHandler).to(MercadoPagoWebhookHandlerUseCase).inSingletonScope();
container.bind<WebhookController>(TYPES.WebhookController).to(WebhookController).inSingletonScope();

export { container };
