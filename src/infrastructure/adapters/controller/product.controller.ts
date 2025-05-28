import { FastifyReply, FastifyRequest } from 'fastify';

import { Product } from '#/core/application/use-cases/product';
import { ProductCreateDTO, ProductListDTO } from '#/infrastructure/adapters/dto/product-list.dto';
import { TypeormProductRepository } from '#/infrastructure/persistence/typeorm-product.repository';

export class ProductController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ProductListDTO;

        const repository = new TypeormProductRepository();
        const useCase = new Product(repository);

        const result = await useCase.list(query);

        return reply.status(200).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormProductRepository();
        const useCase = new Product(repository);

        const result = await useCase.get(id);

        return reply.status(200).send(result);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const payload = request.body as ProductCreateDTO;

        const repository = new TypeormProductRepository();
        const useCase = new Product(repository);

        const result = await useCase.create(payload);

        return reply.status(201).send(result);
    }
}
