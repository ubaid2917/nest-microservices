import { NestFactory } from '@nestjs/core';
import { TestModule } from './test.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'test'; 
   
  const logger = new Logger('TestBootstrap'); 
  const port = Number(process.env.TEST_PORT) || 4014;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TestModule, 
    {
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port
      }
    }
  )
  app.enableShutdownHooks();
  await app.listen();
  logger.log(`🚀 Test service is running on port ${port}`);
}

bootstrap();
