import { FastifyReply, FastifyRequest } from 'fastify';

import { GetProductCategoryUseCase } from '#/core/application/usecases/product-category/get-product-category.usecase';
import { ListProductCategoryUseCase } from '#/core/application/usecases/product-category/list-product-category.usecase';
import { ProductCategoryListDTO } from '#/infrastructure/adapters/dto/product-category-list.dto';
import { TypeormProductCategoryRepository } from '#/infrastructure/persistence/typeorm-product-category.repository';

export class ProductCategoryController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ProductCategoryListDTO;

        const repository = new TypeormProductCategoryRepository();
        const useCase = new ListProductCategoryUseCase(repository);

        const result = await useCase.execute(query);

        return reply.status(200).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormProductCategoryRepository();
        const useCase = new GetProductCategoryUseCase(repository);

        const result = await useCase.execute(id);

        return reply.status(200).send(result);
    }
}
