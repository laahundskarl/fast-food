import { FastifyReply, FastifyRequest } from 'fastify';

import { globalPrismaClient } from '#/database/prisma';
import { ProductCategoryListDto } from '#/dto/product-category.dto';
import { PrismaProductCategoryRepository } from '#/repositories/prisma/prisma-product-category.repository';
import { GetProductCategoryUseCase } from '#/usecases/product-category/get-product-category.usecase';
import { ListProductCategoryUseCase } from '#/usecases/product-category/list-product-category.usecase';

export class ProductCategoryController {
    private readonly repository: PrismaProductCategoryRepository;

    constructor() {
        this.repository = new PrismaProductCategoryRepository(globalPrismaClient);
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
