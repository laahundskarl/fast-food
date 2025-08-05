export const TYPES = {
    // Database
    PrismaClient: Symbol.for('PrismaClient'),

    // Repositories
    ClientRepository: Symbol.for('ClientRepository'),
    OrderRepository: Symbol.for('OrderRepository'),
    PaymentRepository: Symbol.for('PaymentRepository'),
    ProductCategoryRepository: Symbol.for('ProductCategoryRepository'),
    ProductRepository: Symbol.for('ProductRepository'),

    // Use Cases
    CreateClientUseCase: Symbol.for('CreateClientUseCase'),
    DeleteClientUseCase: Symbol.for('DeleteClientUseCase'),
    GetClientUseCase: Symbol.for('GetClientUseCase'),
    GetClientOrdersUseCase: Symbol.for('GetClientOrdersUseCase'),
    UpdateClientUseCase: Symbol.for('UpdateClientUseCase'),

    IdentifyUseCase: Symbol.for('IdentifyUseCase'),

    CreateOrderUseCase: Symbol.for('CreateOrderUseCase'),
    DeleteOrderUseCase: Symbol.for('DeleteOrderUseCase'),
    GetOrderUseCase: Symbol.for('GetOrderUseCase'),
    ListOrderUseCase: Symbol.for('ListOrderUseCase'),
    UpdateOrderUseCase: Symbol.for('UpdateOrderUseCase'),
    UpdateOrderStatusUseCase: Symbol.for('UpdateOrderStatusUseCase'),

    GetPaymentUseCase: Symbol.for('GetPaymentUseCase'),
    ListPaymentUseCase: Symbol.for('ListPaymentUseCase'),

    CreateProductUseCase: Symbol.for('CreateProductUseCase'),
    DeleteProductUseCase: Symbol.for('DeleteProductUseCase'),
    GetProductUseCase: Symbol.for('GetProductUseCase'),
    ListProductUseCase: Symbol.for('ListProductUseCase'),
    UpdateProductUseCase: Symbol.for('UpdateProductUseCase'),

    GetProductCategoryUseCase: Symbol.for('GetProductCategoryUseCase'),
    ListProductCategoryUseCase: Symbol.for('ListProductCategoryUseCase'),

    WebhookHandlerUseCase: Symbol.for('WebhookHandlerUseCase'),

    // Controllers
    ClientController: Symbol.for('ClientController'),
    IdentifyController: Symbol.for('IdentifyController'),
    OrderController: Symbol.for('OrderController'),
    PaymentController: Symbol.for('PaymentController'),
    ProductCategoryController: Symbol.for('ProductCategoryController'),
    ProductController: Symbol.for('ProductController'),
    WebhookController: Symbol.for('WebhookController'),

    // Gateways
    CreatePaymentGateway: Symbol.for('CreatePaymentGateway'),
    GetPaymentGateway: Symbol.for('GetPaymentGateway'),

    // Application Services
    ProductOrchestrationService: Symbol.for('ProductOrchestrationService'),
    ClientOrchestrationService: Symbol.for('ClientOrchestrationService'),
    PaymentOrchestrationService: Symbol.for('PaymentOrchestrationService'),
} as const;
