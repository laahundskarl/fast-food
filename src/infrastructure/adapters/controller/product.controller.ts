import { FastifyReply, FastifyRequest } from 'fastify';

import { CreateProductUseCase } from '#/core/application/usecases/product/create-product.usecase';
import { DeleteProductUseCase } from '#/core/application/usecases/product/delete-product.usecase';
import { GetProductUseCase } from '#/core/application/usecases/product/get-product.usecase';
import { ListProductUseCase } from '#/core/application/usecases/product/list-product-usecase';
import { UpdateProductUseCase } from '#/core/application/usecases/product/update-product.usecase';
import { ProductCreateDTO, ProductListDTO, ProductUpdateDTO } from '#/infrastructure/adapters/dto/product-list.dto';
import { TypeormProductRepository } from '#/infrastructure/persistence/typeorm-product.repository';

export class ProductController {
    async list(request: FastifyRequest, reply: FastifyReply) {
        const query = request.query as ProductListDTO;

        const repository = new TypeormProductRepository();
        const useCase = new ListProductUseCase(repository);

        const result = await useCase.execute(query);

        return reply.status(200).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormProductRepository();
        const useCase = new GetProductUseCase(repository);

        const result = await useCase.execute(id);

        return reply.status(200).send(result);
    }

    async create(request: FastifyRequest, reply: FastifyReply) {
        const payload = request.body as ProductCreateDTO;

        const repository = new TypeormProductRepository();
        const useCase = new CreateProductUseCase(repository);

        const result = await useCase.execute(payload);

        return reply.status(201).send(result);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const payload = request.body as ProductUpdateDTO;

        const repository = new TypeormProductRepository();
        const useCase = new UpdateProductUseCase(repository);

        const result = await useCase.execute(id, payload);

        return reply.status(200).send(result);
    }

    async destroy(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormProductRepository();
        const useCase = new DeleteProductUseCase(repository);

        await useCase.execute(id);

        return reply.status(200).send({ message: 'Product deleted successfully' });
    }
}
