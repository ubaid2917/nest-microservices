import { Controller, Get, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./decorators/current-user.decorator";
import * as authTypes from "./auth.types";
import { Public } from "./decorators/public.decorator";
import { rpcError } from '../../../libs/rpc/src/errors/rpc.error';



@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){} 

  @Get('me')
  async me(@CurrentUser() user: authTypes.UserContext) {
    return user;
  } 

@Public()
@Get('test')
async test(){
  
  rpcError('NOT_FOUND', 'User not found');
}

}