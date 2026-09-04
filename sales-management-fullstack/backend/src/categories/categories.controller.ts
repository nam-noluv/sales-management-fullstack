import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // Ai cũng xem được danh sách danh mục (để hiện dropdown filter)
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // ADMIN và SELLER đều được tạo danh mục mới
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN', 'SELLER')
  create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  // Chỉ ADMIN được xoá danh mục (tránh seller xoá nhầm danh mục người khác đang dùng)
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('ADMIN')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(+id);
  }
}
