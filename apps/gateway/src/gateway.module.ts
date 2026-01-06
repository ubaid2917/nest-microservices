import { Module } from '@nestjs/common';
import { CoreConfigModule } from '@core/core-config.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [CoreConfigModule, 
    ClientsModule.register([
      {
        name: 'CATALOG_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? "amqp://localhost:5672"],
          queue: process.env.CATALOG_QUEUE ?? "catalog_queue",
          queueOptions: {
            durable: false
          }
        },
      },
      {
        name: 'SEARCH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? "amqp://localhost:5672"],
          queue: process.env.SEARCH_QUEUE ?? "search_queue",
          queueOptions: {
            durable: false
          }
        },
      },
      {
        name: 'MEDIA_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL ?? "amqp://localhost:5672"],
          queue: process.env.MEDIA_QUEUE ?? "media_queue",
          queueOptions: {
            durable: false
          }
        },
      },
    ])
  ],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
