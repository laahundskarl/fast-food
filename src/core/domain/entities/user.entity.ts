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

import { Client } from '#/core/domain/entities/client.entity';

export enum UserType {
    CLIENT = 'client',
    EMPLOYEE = 'employee',
}

@Entity('user')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'client_id', type: 'char', length: 36, nullable: true })
    clientId?: string;

    @Column({ type: 'varchar', length: 255 })
    username!: string;

    @Column({ type: 'varchar', length: 255 })
    password!: string;

    @Column({ type: 'enum', enum: UserType })
    type!: UserType;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'update_at' })
    updatedAt!: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt?: Date;

    @ManyToOne(() => Client, client => client.users)
    @JoinColumn({ name: 'client_id' })
    client!: Client;
}
