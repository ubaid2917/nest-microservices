import { CoreConfigModule } from '@core/core-config.module';
import { Module } from '@nestjs/common';
import { TestController } from './test.controller';
import { TestService } from './test.service';

@Module({
  imports: [
    CoreConfigModule,
  ],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
