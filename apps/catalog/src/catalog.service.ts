import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
  ping() {
    return {
      message: 'pong',
      service: 'catalog',
      date: new Date(),
      
    };
  }
}
