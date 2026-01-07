export const TYPES = {
    // Database
    PrismaClient: Symbol.for('PrismaClient'),

    // Repositories
    ClientRepository: Symbol.for('ClientRepository'),
    ProductCategoryRepository: Symbol.for('ProductCategoryRepository'),
    ProductRepository: Symbol.for('ProductRepository'),

    // Use Cases
    CreateClientUseCase: Symbol.for('CreateClientUseCase'),
    DeleteClientUseCase: Symbol.for('DeleteClientUseCase'),
    GetClientUseCase: Symbol.for('GetClientUseCase'),
    GetClientOrdersUseCase: Symbol.for('GetClientOrdersUseCase'),
    UpdateClientUseCase: Symbol.for('UpdateClientUseCase'),

    CreateProductUseCase: Symbol.for('CreateProductUseCase'),
    DeleteProductUseCase: Symbol.for('DeleteProductUseCase'),
    GetProductUseCase: Symbol.for('GetProductUseCase'),
    ListProductUseCase: Symbol.for('ListProductUseCase'),
    UpdateProductUseCase: Symbol.for('UpdateProductUseCase'),

    GetProductCategoryUseCase: Symbol.for('GetProductCategoryUseCase'),
    ListProductCategoryUseCase: Symbol.for('ListProductCategoryUseCase'),

    // Controllers
    ClientController: Symbol.for('ClientController'),
    ProductCategoryController: Symbol.for('ProductCategoryController'),
    ProductController: Symbol.for('ProductController'),

    // Services
    Logger: Symbol.for('Logger'),
} as const;
