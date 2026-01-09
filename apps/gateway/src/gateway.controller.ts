import { Controller, Get, Inject } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, from } from 'rxjs';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class GatewayController {
  constructor(
    @Inject('CATALOG_CLIENT') private readonly catalogClient: ClientProxy,
    @Inject('SEARCH_CLIENT') private readonly searchClient: ClientProxy,
    @Inject('MEDIA_CLIENT') private readonly mediaClient: ClientProxy,
  ) {}

  private async ping(serviceName: string, client: ClientProxy) {
    try {
      const result = await firstValueFrom(
        client.send('service.ping', { from: 'gateway' }),
      );

      return {
        ok: true,
        service: serviceName,
        result,
      };
    } catch (error) {
      return {
        ok: false,
        service: serviceName,
        error: error?.message ?? 'unknown error',
      };
    }
  }
  @Public()
  @Get('health')
  async health() {
    const [catalog, search, media] = await Promise.all([
      this.ping('catalog', this.catalogClient),
      this.ping('search', this.searchClient),
      this.ping('media', this.mediaClient),
    ]);

    const ok = [catalog, search, media].every(
      (service) => service.ok,
    );

    return {
      ok,
      gateway: {
        service: 'gateway',
        date: new Date(),
      },
      services: {
        catalog,
        search,
        media,
      },
    };
  }
}

