import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import { Product } from '#/core/domain/entities/product.entity';

@Entity('product_category')
export class ProductCategory {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'product_id', type: 'char' })
    productId!: string;

    @Column('varchar')
    name!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @OneToMany(() => Product, product => product.category)
    @JoinColumn({ name: 'product_id' })
    products!: Product[];
}
