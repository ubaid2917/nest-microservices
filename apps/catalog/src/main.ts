import { NestFactory } from '@nestjs/core';
import { CatalogModule } from './catalog.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'catalog';

  const logger = new Logger('CatalogBootstrap');

  const port = Number(process.env.CATALOG_TCP_PORT) || 4011;  
  const rmqUrl = process.env.RABBITMQ_URL ?? "amqp://localhost:5671";
  const queue = process.env.CATALOG_QUEUE ?? "catalog_queue";
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true
        }
      },
    },
  );
  app.enableShutdownHooks();

  await app.listen();

  logger.log(`🚀 Catalog RMQ listening on queue ${queue} `);
}
bootstrap();
