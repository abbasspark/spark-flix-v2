import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { BaseConfig } from './base';

const globalValidationPipeOptions: ValidationPipeOptions = {
  transform: false,
  skipMissingProperties: false,
  skipNullProperties: false,
  skipUndefinedProperties: false,
} as ValidationPipeOptions;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe(globalValidationPipeOptions));
  app.setGlobalPrefix('services');
  app.enableCors({
    origin: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  const configService = app.get(BaseConfig);

  const port = configService.get('APP_PORT');
  const mode = configService.get('APP_ENV');

  const config = new DocumentBuilder()
    .setTitle('Loon Dashboard')
    .setDescription('Loon Export API V2')
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/docs-json')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(port);

  Logger.log(mode, 'Mode');

  Logger.log(`http://127.0.0.1:${port}`, 'host');
}
bootstrap();
