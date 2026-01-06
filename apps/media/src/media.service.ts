import { Injectable } from '@nestjs/common';

@Injectable()
export class MediaService {
 ping() {
    return {
      message: 'pong',
      service: 'media',
      date: new Date(),
      
    };
  }
}
