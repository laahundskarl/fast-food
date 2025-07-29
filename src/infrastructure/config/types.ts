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

    // Controllers
    ClientController: Symbol.for('ClientController'),
    IdentifyController: Symbol.for('IdentifyController'),
    OrderController: Symbol.for('OrderController'),
    PaymentController: Symbol.for('PaymentController'),
    ProductCategoryController: Symbol.for('ProductCategoryController'),
    ProductController: Symbol.for('ProductController'),
} as const;
