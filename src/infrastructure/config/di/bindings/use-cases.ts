import { Container } from 'inversify';

import { CreateClient } from '#/application/use-cases/client/create-client/create-client';
import { ICreateClientUseCase } from '#/application/use-cases/client/create-client/create-client.use-case';
import { DeleteClient } from '#/application/use-cases/client/delete-client/delete-client';
import { IDeleteClientUseCase } from '#/application/use-cases/client/delete-client/delete-client.use-case';
import { GetClientByCpf } from '#/application/use-cases/client/get-client-by-cpf/get-client-by-cpf';
import { IGetClientByCpfUseCase } from '#/application/use-cases/client/get-client-by-cpf/get-client-by-cpf.use-case';
import { GetClientById } from '#/application/use-cases/client/get-client-by-id/get-client-by-id';
import { IGetClientByIdUseCase } from '#/application/use-cases/client/get-client-by-id/get-client-by-id.use-case';
import { UpdateClient } from '#/application/use-cases/client/update-client/update-client';
import { IUpdateClientUseCase } from '#/application/use-cases/client/update-client/update-client.use-case';
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
    container.bind<IGetClientByCpfUseCase>(TYPES.GetClientByCpfUseCase).to(GetClientByCpf).inTransientScope();
    container.bind<IGetClientByIdUseCase>(TYPES.GetClientByIdUseCase).to(GetClientById).inTransientScope();
    container.bind<IUpdateClientUseCase>(TYPES.UpdateClientUseCase).to(UpdateClient).inTransientScope();

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
