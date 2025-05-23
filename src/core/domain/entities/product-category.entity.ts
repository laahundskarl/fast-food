import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import { Product } from '#/core/domain/entities/product.entity';

@Entity('product_category')
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'product_id', type: 'char', length: 36 })
    productId!: string;

    @Column({ type: 'varchar', length: 255 })
    name!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => Product, product => product.categories)
    @JoinColumn({ name: 'product_id' })
    product!: Product;
}
