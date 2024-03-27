import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/LoginDto.dto';
import { SignupDto } from './dto/SignupDto.dto';
import { Admin } from 'src/user/entities/admin.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get('testData')
  async testAdminData(): Promise<Admin[]>  {
    return this.authService.testAdminData();
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
