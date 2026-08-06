import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.use(helmet());
  app.use(cookieParser());
  
  app.enableCors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger OpenAPI Documentation Configuration
  const config = new DocumentBuilder()
    .setTitle('Ramchandrapur Ekota Club API')
    .setDescription('Enterprise-grade API documentation for Ramchandrapur Ekota Club Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Authentication')
    .addTag('Members')
    .addTag('Committee')
    .addTag('Events')
    .addTag('Finance')
    .addTag('Notices')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`🚀 Ramchandrapur Ekota Club API running on http://localhost:${port}/api/v1`);
  console.log(`📚 Swagger Docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
