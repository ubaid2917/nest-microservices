import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';


@Module({
 imports: [UsersModule],   
controllers: [AuthController],
providers: [AuthService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
],
exports: [AuthService]
})
export class AuthModule {}