import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';
import { RpcToHttpExceptionFilter } from '../../../libs/rpc/src/errors/rpc-exception.filter';

async function bootstrap() {
  process.title = 'gateway';

  const logger = new Logger('GatewayBootstrap');

  const app = await NestFactory.create(GatewayModule);

  app.enableShutdownHooks(); 
  app.useGlobalFilters(new RpcToHttpExceptionFilter())

  const port = Number(process.env.GATEWAY_PORT) || 3000;

  await app.listen(port);

  logger.log(`🚀 Gateway service is running on port ${port}`);
}

bootstrap();
