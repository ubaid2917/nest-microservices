import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from '../auth.service';
import { UserService } from '../users/user.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { REQUIRED_ROLE_KEY } from '../decorators/admin.decorator';
import { UserType } from '../enums/user-type.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    //  Allow public routes
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();

    //  Authorization header validation
    const authorization = request.headers['authorization'];

    if (!authorization) {
      throw new UnauthorizedException('Authorization header is required');
    }

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    //  Verify token & build auth context
    const verifiedUser = await this.authService.verifyAndBuildContext(token);

    //  Upsert user in DB
    const dbUser = await this.userService.upsertAuthUser(verifiedUser);

    //  Remove sensitive fields
    const { password, ...user } = dbUser;

    request.user = user;

    // Role-based access control
    const requiredRole = this.reflector.getAllAndOverride<UserType>(
      REQUIRED_ROLE_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRole === UserType.ADMIN && user.role !== UserType.ADMIN) {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
