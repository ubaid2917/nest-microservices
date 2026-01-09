import { RpcException } from '@nestjs/microservices';
import { RpcErrorCode, RpcErrorPayload } from '../types/rpc.type';

export function rpcError(
  code: RpcErrorCode,
  message: string,
): never {
  throw new RpcException({
    code,
    message,
  } satisfies RpcErrorPayload);
}