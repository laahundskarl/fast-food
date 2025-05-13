import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PedidoModule } from './pedido/infrastructure/config/pedido.module';

async function bootstrap() {
  const app = await NestFactory.create(PedidoModule);

  const config = new DocumentBuilder()
    .setTitle('FastFood API')
    .setDescription('APIs do sistema de autoatendimento da lanchonete')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
