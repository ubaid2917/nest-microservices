import { Controller, Get, Inject, Injectable } from "@nestjs/common";
import { AuthService } from "./auth.service";

@Controller('auth')
@Injectable()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ){} 

  @Get('me')
  async me() {
    return this.authService.me();
  }
}