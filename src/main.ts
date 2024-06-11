import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors({ origin: '*' });

  const config = new DocumentBuilder()
    .setTitle('Chatx API Nestj')
    .setDescription('Proyecto de prueba de chat simple con nestjs como backend')
    .setContact('Juan Carlos Perez Zapata', 'https://www.linkedin.com/in/juan-carlos-perez', 'jcarlosp1986@gmail.com')
    .setVersion('1.0')
    .addTag('backend-nestjs-chatx')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(9000);
}
bootstrap();
