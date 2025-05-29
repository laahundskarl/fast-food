USE `fast-food`;

-- Tabela de Categorias de Produto
CREATE TABLE `product_category` (
    `id` CHAR(36) PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP
);

-- Tabela de Produtos
CREATE TABLE `product` (
    `id` CHAR(36) PRIMARY KEY,
    `product_category_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `value` INTEGER NOT NULL,
    `description` VARCHAR(500),
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP,
    FOREIGN KEY (`product_category_id`) REFERENCES `product_category` (`id`)
);

-- Tabela de Clientes
CREATE TABLE `client` (
    `id` CHAR(36) PRIMARY KEY,
    `public_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `cpf` VARCHAR(11) NOT NULL UNIQUE,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE `order` (
    `id` CHAR(36) PRIMARY KEY,
    `public_id` CHAR(36) NOT NULL,
    `client_id` CHAR(36),
    `value` INTEGER,
    `order_number` INTEGER NOT NULL,
    `status` ENUM(
        'aguardando',
        'em preparação',
        'pronto'
    ) NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP,
    FOREIGN KEY (`client_id`) REFERENCES `client` (`id`)
);

-- Tabela de Produtos do Pedido
CREATE TABLE `order_product` (
    `id` CHAR(36) PRIMARY KEY,
    `order_id` CHAR(36) NOT NULL,
    `product_id` CHAR(36) NOT NULL,
    `value` INTEGER,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
);

-- Tabela de Pagamento
CREATE TABLE `payment` (
    `id` CHAR(36) PRIMARY KEY,
    `order_id` CHAR(36) NOT NULL,
    `status` ENUM(
        'pendente',
        'processando',
        'aprovado',
        'recusado'
    ),
    `external_reference` VARCHAR(100),
    `qr_code` TEXT,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP,
    FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
);
