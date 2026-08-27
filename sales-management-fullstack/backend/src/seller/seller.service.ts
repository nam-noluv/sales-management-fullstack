import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateSellerProductDto } from './dto/create-seller-product.dto';
import { UpdateSellerProductDto } from './dto/update-seller-product.dto';

@Injectable()
export class SellerService {
  constructor(private readonly prisma: PrismaService) { }

  // =========================
  // PROFILE
  // =========================

  async getProfile(userId: number) {
    const seller = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        shopName: true,
        role: true,
        createdAt: true,
      },
    });

    if (!seller) {
      throw new NotFoundException('Không tìm thấy tài khoản Seller');
    }

    if (seller.role !== 'SELLER') {
      throw new ForbiddenException('Tài khoản không phải Seller');
    }

    return seller;
  }

  // =========================
  // PRODUCTS
  // =========================

  async getProducts(userId: number) {
    return this.prisma.product.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getProduct(userId: number, productId: number) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        sellerId: userId,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'Không tìm thấy sản phẩm hoặc sản phẩm không thuộc shop của bạn',
      );
    }

    return product;
  }

  async createProduct(
    userId: number,
    dto: CreateSellerProductDto,
  ) {
    return this.prisma.product.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        quantity: dto.quantity,
        imageUrl: dto.imageUrl,
        categoryId: dto.categoryId,

        sellerId: userId,
      },
      include: {
        category: true,
      },
    });
  }

  async updateProduct(
    userId: number,
    productId: number,
    dto: UpdateSellerProductDto,
  ) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        sellerId: userId,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'Không tìm thấy sản phẩm hoặc bạn không có quyền sửa sản phẩm này',
      );
    }

    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
      include: {
        category: true,
      },
    });
  }

  async deleteProduct(
    userId: number,
    productId: number,
  ) {
    const product = await this.prisma.product.findFirst({
      where: {
        id: productId,
        sellerId: userId,
      },
    });

    if (!product) {
      throw new NotFoundException(
        'Không tìm thấy sản phẩm hoặc bạn không có quyền xóa sản phẩm này',
      );
    }

    return this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }

  async getDashboard(userId: number) {
    const seller = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        shopName: true,
        email: true,
        role: true,
      },
    });

    if (!seller || seller.role !== 'SELLER') {
      throw new ForbiddenException(
        'Tài khoản không phải Seller',
      );
    }

    const totalProducts = await this.prisma.product.count({
      where: {
        sellerId: userId,
      },
    });

    const orderItems = await this.prisma.orderItem.findMany({
      where: {
        product: {
          sellerId: userId,
        },
      },
      include: {
        product: true,
        order: true,
      },
    });

    const totalOrders = new Set(
      orderItems.map((item) => item.orderId),
    ).size;

    const totalCustomers = new Set(
      orderItems.map((item) => item.order.customerId),
    ).size;

    const revenue = orderItems.reduce(
      (total, item) => {
        return total + item.price * item.quantity;
      },
      0,
    );

    const recentOrders = await this.prisma.order.findMany({
      where: {
        items: {
          some: {
            product: {
              sellerId: userId,
            },
          },
        },
      },
      include: {
        customer: true,
        items: {
          where: {
            product: {
              sellerId: userId,
            },
          },
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    return {
      shop: {
        id: seller.id,
        shopName: seller.shopName,
        email: seller.email,
      },

      stats: {
        totalProducts,
        totalOrders,
        totalCustomers,
        revenue,
      },

      recentOrders,
    };
  }
}