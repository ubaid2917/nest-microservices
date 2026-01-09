import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const error = exception.getError() as any;

    const statusMap: Record<string, number> = {
      BAD_REQUEST: HttpStatus.BAD_REQUEST,
      NOT_FOUND: HttpStatus.NOT_FOUND,
      UNAUTHORISED: HttpStatus.UNAUTHORIZED,
      PERMISSION_DENIED: HttpStatus.FORBIDDEN,
      VALIDATION_ERROR: HttpStatus.UNPROCESSABLE_ENTITY,
      UNAVAILABLE: HttpStatus.SERVICE_UNAVAILABLE,
      INTERNAL: HttpStatus.INTERNAL_SERVER_ERROR,
    };

    response.status(
      statusMap[error?.code] ?? HttpStatus.INTERNAL_SERVER_ERROR,
    ).json({
      success: false,
      code: error.code,
      message: error.message,
    });
  }
}