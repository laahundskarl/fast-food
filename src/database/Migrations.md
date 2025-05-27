# Migrations

Caso queira adicionar novas migrations, o TypeORM disponibiliza uma ferramenta que compila código TS para JS

#### Criar nova migration
```bash
npm run typeorm migration:create ./src/database/migrations/migration_de_exemplo
```

#### Criar nova seed
```bash
npm run typeorm migration:create ./src/database/seeds/seed_de_exemplo
```

#### Rodar migrations
```bash
npm run typeorm migration:run -d src/database/typeorm.config.ts
```

#### Voltar migration (apenas uma)
```bash
npm run typeorm migration:revert -d src/database/typeorm.config.ts
```

**Lembre-se de atualizar as seeds caso mude a estrutura do banco ou crie tabelas novas**

#### Script para limpar todo o banco
Voltar uma migration de uma vez pode ser demorado, então para resetar todo o banco e testar todas as migrations de uma vez, rode esse script (atualizar caso haja uma tabela nova), execute uma linha de cada vez.

```sql
drop table payment;

drop table migrations_fast_food ;

drop table order_product;

drop table `fast-food`.order;

drop table product;

drop table product_category;

drop table client;
```

#### Rodar apenas migrations, sem as seeds

Há uma validação no [arquivo de migrations](./typeorm.config.ts), caso o NODE_ENV seja test ou dev, ele rodará as migrations e seeds, caso contrário, somente as migrations. Se mesmo no ambiente dev quiser rodar somente as migrations, basta comentar este pedaço de código `, ...(!shouldSeedDb ? [] : [__dirname + '/seeds/*.{js,ts}'])`