import { FastifyReply, FastifyRequest } from 'fastify';
import { inject, injectable } from 'inversify';

import { CreateProductDto } from '#/application/use-cases/product/create-product/create-product.dto';
import { ICreateProductUseCase } from '#/application/use-cases/product/create-product/create-product.use-case';
import { IDeleteProductUseCase } from '#/application/use-cases/product/delete-product/delete-product.use-case';
import { IGetProductUseCase } from '#/application/use-cases/product/get-product/get-product.use-case';
import { ListProductDto } from '#/application/use-cases/product/list-product/list-product.dto';
import { IListProductUseCase } from '#/application/use-cases/product/list-product/list-product.use-case';
import { UpdateProductDto } from '#/application/use-cases/product/update-product/update-product.dto';
import { IUpdateProductUseCase } from '#/application/use-cases/product/update-product/update-product.use-case';
import { TYPES } from '#/infrastructure/config/types';
import { IProductController } from '#/interfaces/controller/types/product';
import { ProductPresenter } from '#/interfaces/presenter/product.presenter';
import { httpPresenter } from '#/interfaces/presenter/shared/http.presenter';

@injectable()
export class ProductController implements IProductController {
    constructor(
        @inject(TYPES.CreateProductUseCase) private readonly createProductUseCase: ICreateProductUseCase,
        @inject(TYPES.DeleteProductUseCase) private readonly deleteProductUseCase: IDeleteProductUseCase,
        @inject(TYPES.GetProductUseCase) private readonly getProductUseCase: IGetProductUseCase,
        @inject(TYPES.ListProductUseCase) private readonly listProductUseCase: IListProductUseCase,
        @inject(TYPES.UpdateProductUseCase) private readonly updateProductUseCase: IUpdateProductUseCase,
    ) {}

    async create(request: FastifyRequest, reply: FastifyReply) {
        const body = request.body as CreateProductDto;
        const result = await this.createProductUseCase.execute(body);
        return reply.status(201).send(httpPresenter(ProductPresenter.createProductPresenter(result), 201));
    }

    async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        await this.deleteProductUseCase.execute(request.params.id);
        return reply.send(httpPresenter({ message: 'Product deleted successfully' }, 200));
    }

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const result = await this.getProductUseCase.execute(request.params.id);
        return reply.send(httpPresenter(ProductPresenter.getProductPresenter(result), 200));
    }

    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ListProductDto;
        const result = await this.listProductUseCase.execute(query);
        return reply.send(httpPresenter(ProductPresenter.findProductsPresenter(result), 200));
    }

    async update(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const body = request.body as UpdateProductDto;
        const result = await this.updateProductUseCase.execute(request.params.id, body);
        return reply.send(httpPresenter(ProductPresenter.createProductPresenter(result), 200));
    }
}
