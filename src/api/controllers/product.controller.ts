import { FastifyReply, FastifyRequest } from 'fastify';

import { ProductCreateDto, ProductListDto, ProductUpdateDto } from '#/dto/product.dto';
import { ProductRepository } from '#/repositories/product.repository';
import { CreateProductUseCase } from '#/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from '#/usecases/product/delete-product.usecase';
import { GetProductUseCase } from '#/usecases/product/get-product.usecase';
import { ListProductUseCase } from '#/usecases/product/list-product-usecase';
import { UpdateProductUseCase } from '#/usecases/product/update-product.usecase';

export class ProductController {
    private readonly repository: ProductRepository;

    constructor(repository: ProductRepository) {
        this.repository = repository;
    }

    async create(request: FastifyRequest<{ Body: ProductCreateDto }>, reply: FastifyReply) {
        const useCase = new CreateProductUseCase(this.repository);
        const result = await useCase.execute(request.body);
        return reply.status(201).send(result);
    }

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new GetProductUseCase(this.repository);
        const result = await useCase.execute(request.params.id);
        return reply.send(result);
    }

    async list(request: FastifyRequest<{ Querystring: ProductListDto }>, reply: FastifyReply) {
        const useCase = new ListProductUseCase(this.repository);
        const result = await useCase.execute(request.query);
        return reply.send(result);
    }

    async update(request: FastifyRequest<{ Params: { id: string }; Body: ProductUpdateDto }>, reply: FastifyReply) {
        const useCase = new UpdateProductUseCase(this.repository);
        const result = await useCase.execute(request.params.id, request.body);
        return reply.send(result);
    }

    async destroy(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new DeleteProductUseCase(this.repository);
        await useCase.execute(request.params.id);
        return reply.send({ message: 'Product deleted successfully' });
    }
}
