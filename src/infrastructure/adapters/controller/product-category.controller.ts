import { PrismaClient } from '@prisma/client';
import { FastifyReply, FastifyRequest } from 'fastify';

import { GetProductCategoryUseCase } from '#/core/application/usecases/product-category/get-product-category.usecase';
import { ListProductCategoryUseCase } from '#/core/application/usecases/product-category/list-product-category.usecase';
import { ProductCategoryListDto } from '#/infrastructure/adapters/dto/product-category.dto';
import { PrismaProductCategoryRepository } from '#/infrastructure/persistence/prisma/prisma-product-category.repository';

export class ProductCategoryController {
    private readonly repository: PrismaProductCategoryRepository;

    constructor() {
        this.repository = new PrismaProductCategoryRepository(new PrismaClient());
    }

    async get(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        const useCase = new GetProductCategoryUseCase(this.repository);
        const result = await useCase.execute(request.params.id);
        return reply.send(result);
    }

    async list(request: FastifyRequest<{ Querystring: ProductCategoryListDto }>, reply: FastifyReply) {
        const useCase = new ListProductCategoryUseCase(this.repository);
        const result = await useCase.execute(request.query);
        return reply.send(result);
    }
}
