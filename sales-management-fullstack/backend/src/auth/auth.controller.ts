import { Body, Controller, Post } from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password);
  }

  @Post('admin/login')
  adminLogin(@Body() body: LoginDto) {
    return this.authService.login(body.email, body.password, Role.ADMIN);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req: Request & { user: AuthUser }) {
    return req.user;
  }
}

interface AuthUser {
  id: number;
  email: string;
  role: string;
}
