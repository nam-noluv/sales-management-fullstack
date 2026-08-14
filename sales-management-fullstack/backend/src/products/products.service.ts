import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async getStats() {
    const products = await this.prisma.product.findMany();

    const totalProducts = products.length;

    const totalQuantity = products.reduce((sum, p) => sum + p.quantity, 0);

    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );

    return {
      totalProducts,
      totalQuantity,
      totalValue,
    };
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  findOne(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
      where: { id },
    });
  }

  create(data: CreateProductDto): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  update(id: number, data: UpdateProductDto): Promise<Product> {
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  remove(id: number): Promise<Product> {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
