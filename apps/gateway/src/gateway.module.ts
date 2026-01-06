import { Module } from '@nestjs/common';
import { CoreConfigModule } from '@core/core-config.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [CoreConfigModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
