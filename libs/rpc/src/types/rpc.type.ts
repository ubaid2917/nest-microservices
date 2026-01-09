export type RpcErrorCode = 
| 'NOT_FOUND'
| 'INVALID_ARGUMENT'
| 'PERMISSION_DENIED'
| 'UNAVAILABLE'
| 'BAD_REQUEST'
| 'UNAUTHORIZED'
| 'VALIDATION_ERROR'
| 'INTERNAL'  


export type RpcErrorPayload = {
    code: RpcErrorCode
    message: string
}