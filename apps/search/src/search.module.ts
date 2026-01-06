import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { CoreConfigModule } from '@core/core-config.module';

@Module({
  imports: [CoreConfigModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
