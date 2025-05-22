USE `fast-food`;

-- Tabela de Produtos
CREATE TABLE `product` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `value` NUMERIC NOT NULL,
  `description` VARCHAR(500),
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP
);

-- Tabela de Categorias de Produto
CREATE TABLE `product_category` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `product_id` INTEGER NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`)
);

-- Tabela de Clientes
CREATE TABLE `client` (
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
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
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `public_id` CHAR(36) NOT NULL,
  `client_id` INTEGER,
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
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `order_id` INTEGER NOT NULL,
  `product_id` INTEGER NOT NULL,
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
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `order_id` INTEGER NOT NULL,
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
  `id` INTEGER PRIMARY KEY AUTO_INCREMENT,
  `client_id` INTEGER,
  `name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `type` ENUM('client', 'employee') NOT NULL,
  `created_at` TIMESTAMP NOT NULL,
  `update_at` TIMESTAMP,
  `deleted_at` TIMESTAMP,
  FOREIGN KEY (`client_id`) REFERENCES `client`(`id`)
);
