import { createClerkClient, verifyToken } from '@clerk/backend';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './users/dtos/create-user.dto';
import bcryprt from 'bcrypt';
import { UserType } from './enums/user-type.enum';  
import { rpcError } from '../../../libs/rpc/src/errors/rpc.error';


@Injectable()
export class AuthService {
  private readonly clerk = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY,
    publishableKey: process.env.CLERK_PUBLIC_KEY,
  });

  private jwtVerifyOptions(): Record<string, any> {
    return {
      secretKey: process.env.CLERK_SECRET_KEY,
    };
  }

  async verifyAndBuildContext(token: string): Promise<CreateUserDto> {
    try {
      const verified: any = await verifyToken(token, this.jwtVerifyOptions());

      const payload = verified?.payload ?? verified?.payload ?? verified;

      const clerkUserId = payload?.sub ?? payload?.sub ?? payload;

      if (!clerkUserId) {
        throw new UnauthorizedException('Token is missing');
      }

      const hashedPassword = await bcryprt.hash('12345', 10);

      if (payload?.email && payload?.name) {
        return {
          clerkUserId,
          name: payload?.name ?? payload?.name ?? payload,
          email: payload?.email ?? payload?.email ?? payload,
          password: hashedPassword,
          role: UserType.USER,
        };
      }

      const user = await this.clerk.users.getUser(clerkUserId);
      return {
        clerkUserId,
        name: user?.firstName ?? '',
        email: user?.emailAddresses[0]?.emailAddress ?? '',
        password: hashedPassword,
        role: UserType.USER,
      };
    } catch (err) {
       rpcError('UNAUTHORISED', 'Invalid token');
    }
  }
}
