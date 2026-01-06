import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CoreConfigModule } from '@core/core-config.module';

@Module({
  imports: [CoreConfigModule],
  controllers: [MediaController],
  providers: [MediaService],
})
export class MediaModule {}
