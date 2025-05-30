import { Repository } from 'typeorm';
import { DataSource } from 'typeorm';

import { Payment } from '#/core/domain/entities/payment.entity';
import { PaymentRepository } from '#/core/domain/repositories/payment.repository';
import { AppDataSource } from '#/database/typeorm.config';
import { PaymentCreateDTO } from '#/infrastructure/adapters/dto/payment.dto';

export class TypeormPaymentRepository implements PaymentRepository {
    private dataSource: DataSource;
    private paymentRepository: Repository<Payment>;

    public constructor() {
        this.dataSource = AppDataSource;
        this.paymentRepository = this.dataSource.getRepository(Payment);
    }

    create(payment: PaymentCreateDTO): Promise<any> {
        return this.paymentRepository.save(payment);
    }
}
