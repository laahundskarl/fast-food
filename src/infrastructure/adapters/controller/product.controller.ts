import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateProductUseCase } from '#/core/application/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from '#/core/application/usecases/product/delete-product.usecase';
import { GetProductUseCase } from '#/core/application/usecases/product/get-product.usecase';
import { ListProductUseCase } from '#/core/application/usecases/product/list-product-usecase';
import { UpdateProductUseCase } from '#/core/application/usecases/product/update-product.usecase';
import { ProductCreateDto, ProductListDto, ProductUpdateDto } from '#/infrastructure/adapters/dto/product.dto';
import { PrismaProductRepository } from '#/infrastructure/persistence/prisma/prisma-product.repository';

export class ProductController {
    private readonly repository: PrismaProductRepository;

    constructor() {
        this.repository = new PrismaProductRepository(new PrismaClient());
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
