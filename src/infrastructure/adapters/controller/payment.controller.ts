import { FastifyReply, FastifyRequest } from 'fastify';
import { PaymentUpsertDTO } from '../dto/payment.dto';
import { TypeormPaymentRepository } from '#/infrastructure/persistence/typeorm-payment.repository';
import { UpsertPaymentUseCase } from '#/core/application/usecases/payment/upsert-product.usecase';
import { GetPaymentUseCase } from '#/core/application/usecases/payment/get-payment.usecase';

export class PaymentController {
    async upsert(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };
        const body = request.body as PaymentUpsertDTO;

        const repository = new TypeormPaymentRepository();
        const useCase = new UpsertPaymentUseCase(repository);

        const result = await useCase.execute(id, body);

        return reply.status(200).send(result);
    }

    async get(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        const repository = new TypeormPaymentRepository();
        const useCase = new GetPaymentUseCase(repository);

        const result = await useCase.execute(id);

        return reply.status(200).send(result);
    }
}
