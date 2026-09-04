import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // ----- Đăng ký NGƯỜI MUA -----
    if (dto.role === 'CUSTOMER') {
      const user = await this.prisma.$transaction(async (tx) => {
        const customer = await tx.customer.create({
          data: {
            name: dto.name!,
            phone: dto.phone!,
            address: dto.address!,
            email,
          },
        });

        return tx.user.create({
          data: {
            email,
            password: hashedPassword,
            role: Role.CUSTOMER,
            customerId: customer.id,
          },
        });
      });

      return user;
    }

    // ----- Đăng ký NGƯỜI BÁN -----
    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: Role.SELLER,
        shopName: dto.shopName,
      },
    });

    return user;
  }

  async login(email: string, password: string, requiredRole?: Role) {
    const user = await this.prisma.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    if (requiredRole && user.role !== requiredRole) {
      throw new ForbiddenException('Tài khoản không có quyền quản trị');
    }

    const token = this.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        shopName: user.shopName,
      },
    };
  }

  async getprofile(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        shopName: true,
      },
    });
  }
}
