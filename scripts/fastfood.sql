USE `fast-food`;

-- Tabela de Produtos
CREATE TABLE `product` (
  `id` CHAR(36) PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `value` NUMERIC NOT NULL,
  `description` VARCHAR(500),
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);

-- Tabela de Categorias de Produto
CREATE TABLE `product_category` (
  `id` CHAR(36) PRIMARY KEY,
  `product_id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- Tabela de Clientes
CREATE TABLE `client` (
  `id` CHAR(36) PRIMARY KEY,
  `public_id` CHAR(36) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `email` VARCHAR(255),
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);

-- Tabela de Pedidos
CREATE TABLE `order` (
  `id` CHAR(36) PRIMARY KEY,
  `public_id` CHAR(36) NOT NULL,
  `client_id` CHAR(36),
  `value` NUMERIC,
  `order_number` INTEGER NOT NULL,
  `status` ENUM('aguardando', 'em preparação', 'pronto') NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`client_id`) REFERENCES `client`(`id`)
);

-- Tabela de Produtos do Pedido
CREATE TABLE `order_product` (
  `id` CHAR(36) PRIMARY KEY,
  `order_id` CHAR(36) NOT NULL,
  `product_id` CHAR(36) NOT NULL,
  `amount` NUMERIC,
  `value` NUMERIC,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- Tabela de Pagamento
CREATE TABLE `payment` (
  `id` CHAR(36) PRIMARY KEY,
  `order_id` CHAR(36) NOT NULL,
  `status` ENUM('pendente', 'processando', 'aprovado', 'recusado'),
  `external_reference` VARCHAR(100),
  `qr_code` TEXT,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`)
);

-- Tabela de Usuários
CREATE TABLE `user` (
  `id` CHAR(36) PRIMARY KEY,
  `client_id` CHAR(36),
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `type` ENUM('client', 'employee') NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`client_id`) REFERENCES `client`(`id`)
);
