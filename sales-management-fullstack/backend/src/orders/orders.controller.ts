import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('orders')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Roles('ADMIN')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get('my-orders')
  @UseGuards(AuthGuard('jwt'))
  findMyOrders(@Req() req) {
    console.log(req.user);

    return this.ordersService.findMyOrders(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return this.ordersService.update(req.user.id, +id, dto);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.ordersService.remove(req.user.id, +id);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Req() req, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(req.user.id, dto);
  }
}
