import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
   ping() {
    return {
      message: 'pong',
      service: 'search',
      date: new Date(),
      
    };
  }
}
