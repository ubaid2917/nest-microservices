import { Module } from '@nestjs/common';
import { CoreConfigModule } from '@core/core-config.module';
import { CatalogController } from './catalog.controller';
import { CatalogService } from './catalog.service';

@Module({
  imports: [CoreConfigModule],
  controllers: [CatalogController],
  providers: [CatalogService],
})
export class CatalogModule {}
