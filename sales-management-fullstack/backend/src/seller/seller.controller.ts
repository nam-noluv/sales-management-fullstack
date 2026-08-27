import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import type { Request } from 'express';

import { SellerService } from './seller.service';

import { CreateSellerProductDto } from './dto/create-seller-product.dto';
import { UpdateSellerProductDto } from './dto/update-seller-product.dto';

import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('seller')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('SELLER')
export class SellerController {
  constructor(
    private readonly sellerService: SellerService,
  ) { }

  // =========================
  // PROFILE
  // =========================

  @Get('profile')
  getProfile(@Req() req: Request) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.getProfile(user.id);
  }

  // =========================
  // PRODUCTS
  // =========================

  @Get('dashboard')
  getDashboard(@Req() req: Request) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.getDashboard(user.id);
  }

  @Get('products')
  getProducts(@Req() req: Request) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.getProducts(user.id);
  }

  @Get('products/:id')
  getProduct(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.getProduct(
      user.id,
      id,
    );
  }

  @Post('products')
  createProduct(
    @Req() req: Request,
    @Body() dto: CreateSellerProductDto,
  ) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.createProduct(
      user.id,
      dto,
    );
  }

  @Patch('products/:id')
  updateProduct(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSellerProductDto,
  ) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.updateProduct(
      user.id,
      id,
      dto,
    );
  }

  @Delete('products/:id')
  deleteProduct(
    @Req() req: Request,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const user = req.user as {
      id: number;
      role: string;
    };

    return this.sellerService.deleteProduct(
      user.id,
      id,
    );
  }
}