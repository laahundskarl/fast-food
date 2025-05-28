-- Inserção das categorias
INSERT INTO
    `product_category` (`id`, `name`, `created_at`)
VALUES (UUID(), 'lanche', NOW()),
    (
        UUID(),
        'acompanhamento',
        NOW()
    ),
    (UUID(), 'bebida', NOW()),
    (UUID(), 'sobremesa', NOW());

-- Inserção de produtos para cada categoria
INSERT INTO
    `product` (
        `id`,
        `product_category_id`,
        `name`,
        `value`,
        `description`,
        `created_at`
    )
VALUES
    -- Lanches
    (
        UUID(),
        (
            SELECT id
            FROM product_category
            WHERE
                name = 'lanche'
        ),
        'X-Burguer',
        15.90,
        'Pão, carne, queijo e salada',
        NOW()
    ),
    (
        UUID(),
        (
            SELECT id
            FROM product_category
            WHERE
                name = 'lanche'
        ),
        'X-Frango',
        16.90,
        'Pão, frango grelhado, queijo e salada',
        NOW()
    ),

-- Acompanhamentos
(
    UUID(),
    (
        SELECT id
        FROM product_category
        WHERE
            name = 'acompanhamento'
    ),
    'Batata frita',
    9.90,
    'Porção de batata frita crocante',
    NOW()
),
(
    UUID(),
    (
        SELECT id
        FROM product_category
        WHERE
            name = 'acompanhamento'
    ),
    'Onion rings',
    10.90,
    'Anéis de cebola empanados',
    NOW()
),

-- Bebidas
(
    UUID(),
    (
        SELECT id
        FROM product_category
        WHERE
            name = 'sobremesa'
    ),
    'Refrigerante lata',
    5.00,
    'Lata de refrigerante 350ml',
    NOW()
),
(
    UUID(),
    (
        SELECT id
        FROM product_category
        WHERE
            name = 'sobremesa'
    ),
    'Suco natural',
    7.00,
    'Suco natural da fruta',
    NOW()
),

-- Sobremesas
(
    UUID(),
    (
        SELECT id
        FROM product_category
        WHERE
            name = 'lanche'
    ),
    'Sorvete',
    8.50,
    'Taça de sorvete com cobertura',
    NOW()
),
(
    UUID(),
    (
        SELECT id
        FROM product_category
        WHERE
            name = 'lanche'
    ),
    'Brownie',
    9.50,
    'Brownie de chocolate com calda quente',
    NOW()
);
