import { FastifyReply, FastifyRequest } from 'fastify';

import { ProductCategory } from '#/core/application/use-cases/product-category';
import { ProductCategoryListDTO } from '#/infrastructure/adapters/dto/product-category-list.dto';
import { TypeormProductCategoryRepository } from '#/infrastructure/persistence/typeorm-product-category.repository';

export class ProductCategoryController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ProductCategoryListDTO;

        const repository = new TypeormProductCategoryRepository();
        const useCase = new ProductCategory(repository);

        const result = await useCase.list(query);

        return reply.status(200).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormProductCategoryRepository();
        const useCase = new ProductCategory(repository);

        const result = await useCase.get(id);

        return reply.status(200).send(result);
    }
}
